## Smart FARBAR: My submission for The 6-week Smart Contract Hackathon (hosted at Devpost and sponsored by Daml and SE2)

Presentation YouTube video link: https://youtu.be/r-KumpMmjaQ

## Installation instructions
Clone GitHub repo.

Follow instructions at Daml.com to set up environment.

Add to the (React) ui folder a .env file containing user token values.

In one terminal window, from the project directory start the Daml ledger:
- daml start

In a second terminal window, change directories and launch the front end:
- cd ui
- npm start

From a web browser, navigate to http://localhost:3000

## Inspiration
Coming into this hackathon as someone completely new to smart contracts and blockchain concepts generally, it quickly dawned on me that it would be wise for my project to be in a domain with which I was familiar.  (Unfortunately, this ruled out financial services, insurance, and healthcare.) Having incorrectly made a gross oversimplification of what I assumed smart contracts were, my first thought was to create an application for real estate transactions. That was short-lived, however, as I started considering other domains that would benefit from more automated processes.

As I learned about drivers behind the concept, though, I found myself thinking more and more about principled notions like transparency, ethics, duty, and trust.  This brought my attention back to the real estate sector, which is replete with stories that run contrary to such principles (many of which I have witnessed firsthand).  Developed properly, I can foresee a smart contract paradigm transforming not only the way that real estate sale and purchase transactions transpire, but on a much grander scale how the principle-agent relationship is conducted in multi-party transactions in general. (I have to credit Steve Seow for inspiring me to think about this bigger picture.)

## What it does
In Florida, the vast majority of real estate sale and purchase agreements are based on forms developed and approved by the Florida Realtors and The Florida Bar.  Dubbed the FARBAR, residential sales of single family residences are particularly dominated by these forms. Besides all the issues, problems, and headaches that can come to life in between contract execution and closing, just getting to a fully executed contract often can be a chore.  A small sampling of problematic issues that can and do arise includes:
- Offers not being reviewed by sellers' agents (e.g., email junk folder).
- Sellers not knowing for certain their own agents are presenting them with every offer received (e.g., listing agents can make a larger commission if they make a sale "in-house").
- Buyers being uncertain that their offers were reviewed by sellers.
- Buyers not knowing on a timely basis the standing of offers and therefore cannot "move on" (e.g., seller's agent doesn't bother to get back to the buyer's agent).
- Offers and counteroffers expiring as a result of parties being "casual" about expiration deadlines.

This first iteration of Smart FARBAR seeks to address the first four of these issues. It does so by pairing the transparency and immutability of the blockchain ledger with the privacy protections that are available to applications developed using Daml. If all sellers, buyers, and their agents were to adopt a platform such as the one envisioned by Smart FarBAR that is based on and enforced by smart contracts, agents would be incentivized in their behavior and conduct, knowing that their clients will see all offers, counteroffers, and rejections, and even be able to anticipate that a counter is coming.

## How I built it
Even though this is only my second hackathon submission, the approach taken was starkly different than my last one, thanks to the resources and structure generously provided to participants by Digital Asset. Leaning heavily on live kickoff and weekly Zoom calls, Steve Seow's Daml 101 video series on YouTube, Levente Barczy's Introduction to Daml course, and available skeleton code and documentation, I spent the first few weeks familiarizing myself with Daml. After settling on my use case, I started with the _initiate & accept_ model introduced by Steve (and his son Ethan!) in one of the Daml 101 episodes and added layer upon layer to mirror the basic workflow typical in forming a fully executed contract for the sale and purchase of real estate in Florida.

After testing the workflow of my Daml model with different scenario-based scripts and the Daml Sandbox, I began to develop a UI from scratch using React libraries. Although I have had some limited experience with React, my skill level with front end development is sorely lacking, and so this too was a learning process. I also used tools from the Material UI library to aid in developing my UI.

The React front end single page application utilizes Daml-furnished REST APIs to create Daml-based contracts, exercise prescribed choices on those contracts, and even proactively archive contracts when appropriate.

## Challenges I ran into
As someone still relatively new to technologies used to develop web applications, the obvious challenge was just learning these tools to create a product that functions as intended and hopefully in a manner that doesn't torpedo the user experience.

However, that was not my biggest hurdle. Unexpectedly, it instead was developing the workflow model for the smart contract. This required a deep dive into processes and reflection on the way that people interact. Any model I created would not be very "smart" if it permits a party to circumvent pre-established and agreed upon protocols and conventions. Consequently, I found myself refining the model all the way up until the final week.

## Accomplishments that I'm proud of
I'm most proud that I was able to learn as much as I did in such a short time period, given all my other responsibilities.  Moreover, I do feel that - pending feedback, of course - with this project I have the makings of a viable framework for not only developing a smart contract application for the real estate industry, but also one that tackles issues and concerns in multi-party transaction-based principal-agent relationships that transcend any one domain.

## What I learned
Remarkably, the first time I had really thought or read about smart contracts was ten minutes before the hackathon's live kickoff call six short weeks ago.  Since then, not only have I learned much about the space and underlying technologies, but I've also discovered a passion for what smart contracts attempt to accomplish.  Transparency.  Ethical conduct.  Honesty.  Competency and accuracy.  These are only a few of the things that we can expect with smart contracts.

One would think, then, that every developer would want to dive into this space.  Prior to learning Daml, I was thinking (no doubt like many others), however, that the learning curve was too flat given what I had heard about other popular blockchain technologies that were made to be overly complex.  Daml simplifies the process, however, as well as introduce flexibility into how it's deployed.

## What's next for Smart FAR-BAR
Drawn to this space, I plan to continue developing the application and learn as much as I can about smart contracts and blockchain technologies. My next step is to deploy it on Daml Hub and make it live. I even have acquired the domain name of www.smartfarbar.com. The next iteration will expand on features to include enforcing deadlines and continuing the workflow from contract execution to the closing table (although I can see tables disappearing altogether in the near future).

I am very grateful to Digital Asset and SE2 for sponsoring this hackathon.  Without them, I may have never come to appreciate what this space offers and technologies like Daml that make them practical and easy - or perhaps more accurately - _easier_ to put into action.

## Screenshots

<img src="https://i.ibb.co/qmf6hNN/smart-far-bar.gif" title="Slide Show (animated GIF)" alt="presentation"></a>

<img src="https://i.ibb.co/Nm4dtLL/screenshot0.png" title="Login screen" alt="login"></a>

<img src="https://i.ibb.co/nDgGt7N/screenshot1.png" title="Client dashboard" alt="presentation"></a>

<img src="https://i.ibb.co/2N6H2J3/screenshot2.png" title="Realtor dashboard" alt="presentation"></a>

<img src="https://i.ibb.co/0C0fVLx/screenshot3.png" title="Main.daml file in VS Code" alt="main.daml"></a>
