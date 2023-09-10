# VectorCV Beta - v.0.0.1
<p align='center'>
   <img src='https://github.com/miranamer/VectorCV/assets/91673777/2402663d-5fa9-464e-b1dc-118108faf542' />
</p>
<p align='center'>
   <img src='https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54' />
   <img src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' />
   <img src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' />
   <img src='https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white' />
   <img src='https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white' />
</p>
<p align='center'>
   <img alt="Static Badge" src="https://img.shields.io/badge/Langchain-green?style=for-the-badge">
   <img alt="Static Badge" src="https://img.shields.io/badge/HuggingFace-yellow?style=for-the-badge">
   <img alt="Static Badge" src="https://img.shields.io/badge/ChromaDB-red?style=for-the-badge">
</p>

<h1>What is VectorCV?</h1>
<p>VectorCV is a React app that allows you (recruiters) to enter your candidates' CV's and find out who are the best candidates for the job. This is all done through embeddings, vector databases and queries by GPT-3.5</p>


<h1>Diagram:</h1>
<p align='center'>
   <img height='280px' src='https://github.com/miranamer/VectorCV/assets/91673777/52ac96ea-30c8-4d3c-aede-9d36b826a4cf' />
</p>

<h1>How Does It Work?</h1>
<ol>
   <li>Users' CV's (PDF Files) and ideal CV (String) are sent to the Flask Back-end for processing via the route /upload-pdf</li>
   <li>In the Flask Back-end, the data is sent to a function called GetBestCandidate() where the processing occurs</li>
   <li>Here, the pdf files are saved in a folder, chunked, then embedded via a huggingface model and then stored in a ChromaDB Vector database to be queried</li>
   <li>GPT-3.5 runs the query to find the most suitable candidates and returns this to the Front-end for it to be rendered.</li>
</ol>

<h1>Demo Vid</h1>


https://github.com/miranamer/VectorCV/assets/91673777/bbdb64b6-0b16-4bea-9326-61b8bd8f41a1


<h1>Bug Fixes:</h1>

- [x] Make Content Fit The TextBox
- [ ] Optimise Load Times
- [ ] Return Candidates In Ordered Divs
- [ ] Clean Up Styling
- [ ] Make UI More Intuitive (Help Boxes, Explanations)


