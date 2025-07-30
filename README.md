# Memorial Words - AI Eulogy Generator 🕊️

A compassionate AI-powered eulogy generator that helps honor the memory of loved ones with heartfelt, personalized words.

## ✨ Features

- **AI-Powered Generation**: Uses Claude Sonnet 4 to create meaningful, personalized eulogies
- **Respectful Interface**: Beautiful, thoughtful design appropriate for memorial purposes
- **Customizable Tone**: Choose from warm & celebrating, reflective & peaceful, uplifting & hopeful, or personal & intimate
- **Instant Generation**: Get a complete eulogy in seconds
- **Copy to Clipboard**: Easy sharing and printing functionality
- **Responsive Design**: Works beautifully on all devices

## 🚀 Live Demo

Visit the live site: [Memorial Words](https://memorial-words-ai.netlify.app) *(will be available after deployment)*

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Netlify Functions (Serverless)
- **AI**: Anthropic Claude API
- **Hosting**: Netlify
- **Deployment**: Automatic via GitHub

## 🏗️ Architecture

```
User Interface → Netlify Functions → Claude API → Generated Eulogy
```

- **Static Frontend**: Hosted on Netlify's global CDN
- **Serverless Functions**: Handle API calls securely
- **Claude Integration**: Generates thoughtful, contextual eulogies

## 📦 Deployment

### Quick Deploy to Netlify

1. **Fork this repository**
2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Build settings: Leave defaults (no build command needed)
3. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `ANTHROPIC_API_KEY` = your Claude API key
4. **Deploy!** 🎉

### Environment Variables

Create these environment variables in Netlify:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your Claude API key from: [Anthropic Console](https://console.anthropic.com)

### Local Development

```bash
# Clone the repository
git clone https://github.com/closestfriend/memorial-words-ai.git
cd memorial-words-ai

# Install dependencies
npm install

# Install Netlify CLI
npm install -g netlify-cli

# Create .env file (copy from .env.example)
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Start local development server
netlify dev
```

## 📁 Project Structure

```
memorial-words-ai/
├── index.html              # Main interface
├── style.css               # Styling
├── script.js               # Frontend logic
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── netlify/functions/
│   └── generate-eulogy.js  # Serverless function
└── README.md               # This file
```

## 🎨 Customization

### Modifying the AI Prompt

Edit `netlify/functions/generate-eulogy.js` to customize how eulogies are generated:

```javascript
const prompt = `Write a heartfelt eulogy for ${personName}...`;
```

### Styling Changes

Edit `style.css` to modify the appearance. The design uses:
- Georgia serif font for elegance
- Gradient backgrounds for warmth
- Subtle animations for engagement

### Adding New Features

The modular architecture makes it easy to add:
- Multiple language support
- Different eulogy styles
- Print formatting
- Social sharing

## 💰 Cost Estimation

- **Netlify**: Free tier (100GB bandwidth, 125K function invocations/month)
- **Claude API**: ~$0.01-0.02 per eulogy generated
- **Domain** (optional): $10-15/year

## 🔒 Privacy & Security

- **No data storage**: Information is processed in real-time, never stored
- **Secure API calls**: Environment variables protect API keys
- **CORS enabled**: Secure cross-origin requests
- **Rate limiting**: Prevents abuse

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Contribution

- [ ] Multiple language support
- [ ] Additional tone options
- [ ] Print-optimized formatting
- [ ] Accessibility improvements
- [ ] Mobile app version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Anthropic's Claude API](https://anthropic.com)
- Hosted on [Netlify](https://netlify.com)
- Created with compassion for those honoring loved ones

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/closestfriend/memorial-words-ai/issues) page
2. Create a new issue if needed
3. For urgent matters, contact: [your-email]

---

*"In memory, love lives forever."*