# 📚 Fable-Flow - Smart Learning Platform

A comprehensive student learning platform with real-time focus tracking, AI-powered PDF summarization, study materials management, and interactive study tools.

## ✨ Latest Updates - Enhanced Experience!

🎨 **Dark Minimalist Theme** - Sleek dark mode for comfortable studying  
📊 **Optimized Dashboard** - Clean statistics view with activity tracking  
🏆 **Collapsible Achievements** - Dropdown achievements system (12 badges)  
📥 **Working Downloads** - Functional study material downloads  
🛠️ **Study Tools Page** - Flashcards, Pomodoro, Todo, Progress tracker  
🎯 **Improved Profile** - Better layout with proper grid structure  
🔄 **Smart Navigation** - Fixed navbar with better spacing

## 🌟 Features

### 🎯 Focus Tracker
- **Real-time face detection** to monitor attention levels using face-api.js
- **Focus analytics** with detailed session tracking
- **Silent error handling** for smooth user experience
- **Session history** with focus percentage metrics
- **Data persistence** with localStorage

### 📄 PDF Summarizer
- **PDF upload and processing** using PDF.js 3.11.174
- **Text extraction** from documents
- **Summary generation** with key insights
- **Proper contrast** with white background and dark text
- **Summary history** tracking

### 📚 Study Materials
- **6 Subject Categories**: Mathematics, Physics, Chemistry, Computer Science, English Literature, History
- **Downloadable Resources**: 6 sample study materials with one-click downloads
- **Quick Access Links**: Direct navigation to Study Tools, PDF Summarizer, Focus Tracker
- **Subject Cards**: Visual navigation through topics

### 📊 Dashboard
- **4 Key Statistics**: Total Study Time, Average Focus, PDFs Summarized, Study Streak
- **Recent Activity Feed**: Track all learning activities
- **Clean Interface**: Minimalist design focusing on important metrics

### 🔧 Study Tools (Separate Page)
- **Flashcards**: Create and flip cards for memorization practice
- **Pomodoro Timer**: 25-minute work sessions with 5-minute breaks
- **Todo List**: Task management with add/delete functionality
- **Weekly Progress Tracker**: Visual progress bars for each day of the week

### 👤 Profile Management
- **User Information**: Display and edit profile details
- **12 Achievements**: Unlockable badges (dropdown format)
  - First Study Session, 1 Hour Focused, 10 PDFs Summarized
  - 7-Day Streak, Perfect Focus Hour, 30-Day Streak
  - Speed Learner, Knowledge Master, 100 Hours Studied
  - Subject Expert, Consistent Learner, Elite Scholar
- **Preferences**: Notifications, Theme Mode (Light/Dark), Auto-save Progress

### 🎨 Theme System
- **Dark Mode** (Default): Deep slate backgrounds with light text
- **Light Mode**: Clean white backgrounds with dark text
- **Dynamic Switching**: Seamless theme transitions

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge recommended)
- Camera access for focus tracking feature
- Internet connection for initial load

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AKSHAY-RAVIKUMAR-7/Fable-Flow.git
   cd Fable-Flow
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8000/welcome.html`

## 📖 How to Use

### 1. Getting Started
1. Visit **welcome.html** landing page
2. Click **"Get Started"** to proceed to login
3. Enter any email and password (demo mode)
4. Access the main dashboard

### 2. Focus Tracking
1. Navigate to **Focus Tracker** section
2. Click **"Start Tracking"**
3. Allow camera access when prompted
4. The system monitors your attention in real-time
5. View focus percentage and session data
6. Click **"Stop Tracking"** to end session

### 3. PDF Summarizer
1. Go to **PDF Summarizer** section
2. Upload a PDF using "Choose File" or drag-and-drop
3. View extracted text and summary
4. Summary saved to history automatically

### 4. Study Materials
1. Browse 6 subject categories on the page
2. View 6 featured study materials
3. Click **Download** button on any material
4. Files download as .txt with sample content
### 5. Study Tools
1. Click **Study Tools** in quick access or navigate directly
2. Use **Flashcards** to practice memorization
3. Start **Pomodoro Timer** (25 min work / 5 min break)
4. Manage tasks with **Todo List**
5. Track progress with **Weekly Progress Tracker**

### 6. Profile & Achievements
1. Go to **Profile** section
2. Edit your information (email stays readonly)
3. Click **Achievements** header to expand/collapse
4. View 12 achievements (1 unlocked by default)
5. Scroll horizontally to see all badges
6. Customize preferences (Notifications, Theme, Auto-save)

## 🛠️ Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**:
  - Chart.js 3.9.1 - Data visualization
  - face-api.js 0.22.2 - Face detection
  - PDF.js 3.11.174 - PDF processing
  - Font Awesome 6.0.0 - Icons
- **Design**: Dark minimalist theme with purple/teal accents
- **Storage**: localStorage for all data persistence

### File Structure
```
edu-tech/
├── index.html              # Main application
├── login.html              # Authentication page
├── welcome.html            # Landing page
├── README.md              # Documentation
├── css/
│   ├── styles.css         # Main styles (dark theme)
│   ├── login-styles.css   # Login page styles
│   └── welcome-styles.css # Welcome page styles
├── js/
│   ├── app.js             # Core application logic
│   ├── dashboard.js       # Dashboard functionality
│   ├── focus-tracker.js   # Focus tracking system
│   ├── pdf-summarizer.js  # PDF processing
│   ├── theme-manager.js   # Theme switching
│   ├── session-check.js   # Session management
│   ├── login.js           # Authentication
│   └── welcome.js         # Welcome animations
├── pages/
│   ├── study-tools.html   # Study tools interface
│   ├── mathematics.html   # Math resources
│   └── computer-science.html # CS resources
└── images/                # Assets
```

### Browser Compatibility
- Chrome 90+ ✅ (Recommended)
- Edge 90+ ✅
- Firefox 85+ ✅
- Safari 14+ ✅

**Note**: Camera access required for focus tracking.

## 🎨 Color Scheme

### Dark Theme (Default)
- **Primary**: #5f3dc4 (Purple)
- **Secondary**: #7950f2 (Light Purple)
- **Accent**: #20c997 (Teal)
- **Background**: #0f172a, #1e293b (Slate)
- **Text**: #f1f5f9 (Light Gray)
- **Success**: #51cf66 (Green)
- **Warning**: #ffd43b (Yellow)
- **Danger**: #ff6b6b (Red)

### Design Features
- **Minimalist Layout**: Clean, distraction-free interface
- **Glass Effects**: Subtle transparency and blur
- **Smooth Animations**: 0.3s transitions throughout
- **Responsive Grid**: Flexbox and CSS Grid layouts
- **Custom Scrollbars**: Styled scrollbars matching theme

## 📱 Responsive Design

Works perfectly on:
- 💻 **Desktop** (1920x1080 and above)
- � **Laptops** (1366x768 and above)
- 📱 **Tablets** (768px and above)
- 📱 **Mobile** (320px and above)

## 🔒 Privacy & Security

### Data Handling
- **Local storage only** - All data stored in browser's localStorage
- **No backend server** - Completely client-side application
- **Camera processing** - Face detection runs locally, never uploaded
- **No external tracking** - Privacy-focused design

### Security Features
- **HTTPS recommended** for camera access in production
- **Session-based auth** - Simple login with localStorage
- **No data collection** - All information stays on your device
- **Safe downloads** - Study materials generated client-side

## 🎯 Key Features Explained

### Focus Tracking System
- Uses face-api.js models for real-time face detection
- Tracks attention based on face presence and orientation
- Silent error handling if models fail to load
- Session data stored with timestamps and metrics

### Profile Achievements
- 12 unlockable achievements for motivation
- Collapsible dropdown to save space
- Horizontal scroll for viewing all badges
- 1 achievement unlocked by default (First Study Session)

### Study Material Downloads
- 6 pre-configured study materials with sample content
- Download as .txt files with formatted content
- Topics: Math, Physics, Chemistry, CS, English, History
- Success notifications on download

## 🔧 Troubleshooting

### Common Issues

**Camera not working:**
- Grant camera permissions when prompted
- Check if another app is using the camera
- Refresh page and try again

**Downloads not starting:**
- Check browser's download settings
- Ensure pop-ups are not blocked
- Try a different browser

**Theme not changing:**
- Refresh the page (Ctrl+Shift+R)
- Clear browser cache
- Check if theme-manager.js is loaded

**Achievements not expanding:**
- Click directly on the header (not icon)
- Check browser console for JavaScript errors
- Ensure app.js loaded properly

## 🚀 Future Enhancements

- Real AI-powered PDF summarization integration
- Cloud storage for cross-device sync
- Social features for collaborative learning
- Advanced analytics with more chart types
- Mobile app versions (iOS/Android)
- Real PDF files for study materials
- More subject categories and resources

## 👨‍💻 Developer

**AKSHAY RAVIKUMAR**
- GitHub: [@AKSHAY-RAVIKUMAR-7](https://github.com/AKSHAY-RAVIKUMAR-7)
- Repository: [Fable-Flow](https://github.com/AKSHAY-RAVIKUMAR-7/Fable-Flow)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Chart.js** - Beautiful JavaScript charts
- **face-api.js** - Face detection and recognition
- **PDF.js** by Mozilla - PDF rendering in browsers
- **Font Awesome** - Icon library
- **Google Fonts** - Inter and Poppins typography

---

**Fable-Flow** - Empowering students through smart learning technology 📚✨

*Built with ❤️ for students worldwide*

### Keyboard Shortcuts
- `Ctrl/Cmd + D` - Go to Dashboard
- `Ctrl/Cmd + F` - Start Focus Tracking
- `Ctrl/Cmd + P` - Open PDF Summarizer
- `Ctrl/Cmd + S` - Open Study Materials

### Data Export
1. Go to Dashboard
2. Click **"Export Data"** button
3. Save the JSON file with all your data
4. Import later or use with external tools

### Custom Themes
The website supports preference customization:
- Light/Dark mode toggle
- Focus sensitivity adjustment
- Notification preferences

## 🎓 Educational Benefits

### For Students
- **Improved focus** through real-time monitoring
- **Better comprehension** with AI-generated summaries
- **Organized learning** with structured materials
- **Progress tracking** for motivation

### For Educators
- **Student engagement insights** through analytics
- **Study pattern analysis** for better guidance
- **Resource organization** with categorized materials
- **Performance tracking** across subjects

## 📞 Support

If you encounter any issues or need help:

1. **Check this README** for common solutions
2. **Review browser console** for error messages
3. **Ensure all permissions** are granted
4. **Try in a different browser** if issues persist

## 🚧 Future Enhancements

Planned features for future versions:
- **Voice recognition** for hands-free control
- **Collaborative study** rooms
- **Advanced AI tutoring** with personalized responses
- **Integration with learning management systems**
- **Offline mode** with local AI models
- **Mobile app** for iOS and Android

## 🙏 Acknowledgments

This project uses several open-source libraries and services:
- **Chart.js** for data visualization
- **Face-api.js** for face detection
- **PDF.js** for PDF processing
- **OpenAI API** for text summarization
- **Font Awesome** for icons
- **Inter Font** for typography

---

**Happy Learning! 🎓✨**

Start your focused learning journey today and track your progress with EduFocus!