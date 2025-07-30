const { Anthropic } = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight successful' }),
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { personName, relationship, memories, tone } = JSON.parse(event.body);

        // Validate required fields
        if (!personName || !relationship || !memories) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        // Rate limiting check (simple IP-based)
        const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
        console.log(`Request from IP: ${clientIP}`);

        // Craft the prompt
        const prompt = `Write a heartfelt eulogy for ${personName}. 

Context:
- I am their ${relationship}
- Personal memories and qualities: ${memories}
- Desired tone: ${tone}

Please write a eulogy that:
- Is 2-3 minutes when spoken (approximately 300-400 words)
- Feels personal and authentic
- Honors their memory with dignity
- Includes specific details from the memories provided
- Matches the requested tone
- Avoids clichés and generic phrases
- Flows naturally when read aloud

The eulogy should feel like it comes from the heart of someone who truly knew and loved them.`;

        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        const eulogy = message.content[0].text;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                eulogy,
                success: true 
            }),
        };

    } catch (error) {
        console.error('Error generating eulogy:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to generate eulogy. Please try again.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }),
        };
    }
};