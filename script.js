document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('eulogyForm');
    const generateBtn = document.getElementById('generateBtn');
    const result = document.getElementById('result');
    const eulogyText = document.getElementById('eulogyText');
    const copyBtn = document.getElementById('copyBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');

    let currentFormData = null;

    form.addEventListener('submit', handleSubmit);
    copyBtn.addEventListener('click', copyToClipboard);
    regenerateBtn.addEventListener('click', regenerateEulogy);

    async function handleSubmit(e) {
        e.preventDefault();
        
        currentFormData = {
            personName: document.getElementById('personName').value.trim(),
            relationship: document.getElementById('relationship').value,
            memories: document.getElementById('memories').value.trim(),
            tone: document.getElementById('tone').value
        };

        // Basic validation
        if (!currentFormData.personName || !currentFormData.relationship || !currentFormData.memories) {
            alert('Please fill in all required fields.');
            return;
        }

        await generateEulogy(currentFormData);
    }

    async function generateEulogy(formData) {
        try {
            setLoading(true);
            
            const response = await fetch('/api/generate-eulogy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            displayResult(data.eulogy);
            
        } catch (error) {
            console.error('Error:', error);
            let errorMessage = 'Sorry, there was an error generating the eulogy. Please try again.';
            
            if (error.message.includes('fetch')) {
                errorMessage = 'Unable to connect to the service. Please check your internet connection and try again.';
            } else if (error.message.includes('rate limit')) {
                errorMessage = 'Too many requests. Please wait a moment and try again.';
            }
            
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    function setLoading(isLoading) {
        const btnText = generateBtn.querySelector('.btn-text');
        const loading = generateBtn.querySelector('.loading');
        
        generateBtn.disabled = isLoading;
        btnText.style.display = isLoading ? 'none' : 'inline';
        loading.style.display = isLoading ? 'inline' : 'none';
        
        if (isLoading) {
            generateBtn.style.cursor = 'not-allowed';
        } else {
            generateBtn.style.cursor = 'pointer';
        }
    }

    function displayResult(eulogy) {
        eulogyText.textContent = eulogy;
        result.style.display = 'block';
        
        // Smooth scroll to result
        setTimeout(() => {
            result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(eulogyText.textContent);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = eulogyText.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy to Clipboard';
                }, 2000);
            } catch (fallbackErr) {
                alert('Unable to copy to clipboard. Please manually select and copy the text.');
            }
            
            document.body.removeChild(textArea);
        }
    }

    function regenerateEulogy() {
        if (currentFormData) {
            generateEulogy(currentFormData);
        }
    }

    // Add some nice focus effects
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});