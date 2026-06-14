# Daksh Portfolio

A polished portfolio site with interactive project previews, social links, and a contact form that sends submissions via Vercel serverless APIs.

## Features

- Interactive project modal previews
- Smooth scroll and reveal animations
- Social links (LinkedIn, GitHub, Instagram)
- Contact form with email/storage options
- Tech-themed images
- Fully responsive design

## Deployment on Vercel

### Quick Setup

1. **Push to GitHub** (Vercel requires a GitHub repo):
   ```bash
   cd path/to/html
   git init
   git add .
   git commit -m "Daksh portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in or sign up
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will auto-detect the `api/` folder and configure serverless functions
   - Click "Deploy"

3. **Set Environment Variables**:
   - In your Vercel project dashboard, go to **Settings** → **Environment Variables**
   - Add one of the following sets:

   **Option A: SendGrid (email delivery)**
   - `SENDGRID_API_KEY` = your SendGrid API key
   - `TO_EMAIL` = kachwahadaksh@gmail.com
   - (Optional) `FROM_EMAIL` = verified sender email

   **Option B: Airtable (store messages in a table)**
   - `AIRTABLE_API_KEY` = your Airtable API key
   - `AIRTABLE_BASE_ID` = your base ID
   - `AIRTABLE_TABLE_NAME` = Messages

4. **Test the contact form**:
   - Visit your deployed site (e.g., `https://your-project.vercel.app`)
   - Try the contact form in the "Contact" section
   - Verify submissions arrive via email (SendGrid) or Airtable (Airtable option)

## Serverless API Endpoints

- `POST /api/contact` — sends submissions via SendGrid email
- `POST /api/contact_airtable` — saves submissions to Airtable

The front-end defaults to `/api/contact`. To switch to Airtable, edit `index.html` and change the fetch URL in the contact form handler script.

## Files

- `index.html` — portfolio site (frontend + JS for interactivity)
- `api/contact.js` — serverless function for SendGrid
- `api/contact_airtable.js` — serverless function for Airtable
- `package.json` — dependencies 
