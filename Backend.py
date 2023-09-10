from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.embeddings.huggingface import HuggingFaceBgeEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)

# Define the upload folder where files will be saved
UPLOAD_FOLDER = "D:/WebDev_Projects/React/Langchain_CV_Project/CVs/"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    try:
        uploaded_files = request.files.getlist("pdfFile")
        #print('UPLOADED: ', uploaded_files)

        if len(uploaded_files) == 0:
            return jsonify({"error": "No PDF files provided in the request"}), 400
        
        query = request.form.get('query')

        for file in uploaded_files:
            if file.filename == "":
                return jsonify({"error": "PDF file has no name"}), 400

            # Save the PDF file to the upload folder
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], file.filename))
        
        #^ All files are now saved in CV folder
        res = GenerateBestCandidates(query=query)
        return res
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



def GenerateBestCandidates(query: str):
    print('FUNC RUNNING!')
    ind_counter = 0
    vector_index = None

    model_name = "BAAI/bge-large-en"
    model_kwargs = {'device': 'cpu'}

    embeddings = HuggingFaceBgeEmbeddings(
        model_name=model_name,
        model_kwargs=model_kwargs
    )

    directory = "D:/WebDev_Projects/React/Langchain_CV_Project/CVs/"
    for f in os.listdir(directory):
        file_path = "./CVs/" + f
        loader = PyPDFLoader(file_path)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        pages = loader.load_and_split(text_splitter)
        
        if ind_counter == 0:
            vector_index = Chroma.from_documents(pages, embeddings, persist_directory="index_store")
            vector_index.persist()
        else:
            _ = vector_index.add_documents(pages)
        
        ind_counter += 1

    retriever = vector_index.as_retriever(search_type="similarity", search_kwargs={"k":6})
    qa_interface = RetrievalQA.from_chain_type(llm=ChatOpenAI(), chain_type="stuff", retriever=retriever, return_source_documents=True)

    #ideal_resume = "'Personality: Hard Working, Tech Skilled. Skills: React, Medical Sciences, Proteins, Python. Languages: English'"

    return qa_interface(f"Return the most suitable candidates names from most to least suitable (ONLY return each candidates name on separate lines in this format: 1.Candidate Name - Reason), relative to this ideal resume: {query}")['result']


if __name__ == "__main__":
    app.run(debug=False)