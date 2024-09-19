
# Calgary Cares: Empowering Communities to Tackle Homelessness

Calgary Cares is a Next.js-based web application designed to address the challenges of homelessness in Calgary by connecting those in need with vital resources and fostering community support. Our platform provides a comprehensive suite of tools and information to assist both individuals experiencing homelessness and those who want to help.

## Features

### 1. Resource Map
- Interactive Google Maps integration
- Displays locations of shelters, public libraries, restrooms, and food centers in Calgary
- User location tracking for easy navigation
- Directions to selected resources

### 2. Ask For Help
- Form for individuals to request assistance
- Direct connection to support services

### 3. Make a Donation
- Secure platform for financial contributions
- Options for one-time or recurring donations

### 4. Success Stories
- Inspiring narratives of individuals who have overcome homelessness
- Community-building through shared experiences

### 5. Ripple of Kindness
- Social feature for sharing and celebrating acts of kindness
- Image upload capability for visual storytelling

### 6. User Authentication
- Secure login and registration system
- Personalized experience for returning users

## Technology Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Map Integration**: Google Maps API
- **Styling**: CSS Modules
- **Image Storage**: Firebase Storage
- **Deployment**: Vercel

## Deployment

Calgary Cares is deployed using Vercel, providing instant deployment with zero configuration, HTTPS enabled by default, and high performance.

**Production Deployment:**
- URL: [https://calgary-cares.vercel.app](https://calgary-cares.vercel.app)


## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn
- Google Maps API key
- Firebase project setup

### Installation

1. Clone the repository:

git clone https://github.com/Tekri96/hacking_homelessness.git
Copy
2. Navigate to the project directory:
cd calgary-cares
Copy
3. Install dependencies:
npm install
or
yarn install
Copy
4. Set up environment variables:
Create a `.env.local` file in the root directory and add the following:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_FB_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FB_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FB_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FB_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FB_APP_ID=your_firebase_app_id
Copy
5. Run the development server:
npm run dev
or
yarn dev
Copy
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions to Calgary Cares! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all the volunteers and organizations working tirelessly to combat homelessness in Calgary
- Special thanks to the Next.js, Firebase, and Vercel teams for their excellent documentation and community support

## Contact

For any queries or support, open an issue in this repository.

---

Together, we can make a difference in tackling homelessness in Calgary. 
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
