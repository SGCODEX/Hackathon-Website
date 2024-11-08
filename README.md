**Music-Recommendation-Using-Facial-Expressions**

**Project Overview**

This Python-based project leverages the power of OpenCV for facial recognition and a pre trained model (`fer2013_mini_XCEPTION.102-0.66.hdf5` model) for expressions recognition. By analyzing real-time facial expressions, it recommends music tailored to your current mood. To enhance the user experience, the project integrates YouTube search functionalities using the `webbrowser` and `requests` libraries.

**Installation**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/SGCODEX/Music-Recommendation-Using-Facial-Expressions.git
    ```
2.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt --quiet
    ```

**How to Run**

1.  **Execute the Script:**
    ```bash
    python main_face.py
    ```

**Tech Stack & Libraries**

- Python: As the primary programming language for its versatility and extensive libraries.
- OpenCV: For real-time image and video processing, including facial detection.
- TensorFlow and Keras: For building and training the deep learning model to recognize facial expressions.
- fer2013_mini_XCEPTION.102-0.66.hdf5: A pre-trained model for facial emotion recognition.
- webbrowser: To open web pages, specifically YouTube search results.
- requests: For making HTTP requests to interact with web APIs (e.g., YouTube search).

**How it Works / Usage**

1.  **Facial Detection:**
      - The script captures a video feed from your webcam.
      - OpenCV is used to detect faces in each frame.
2.  **Emotion Recognition:**
      - Detected faces are processed by the trained model.
      - The model predicts the dominant emotion (e.g., happy, sad, angry, neutral).
      - Script captures the emotion when we click on the screen, the clicked emotion is stored as current emotion
3.  **Music Recommendation:**
      - Based on the predicted emotion, the script constructs a YouTube search query.
      - The `webbrowser` module opens the search results in your default browser.

- Demo Video: To be added

**Main Features**

**Customization & Additional Considerations**

  - **Model:** Experiment with different pre-trained models or fine-tune the existing one for more accurate emotion recognition.
  - **Search Queries:** Adjust the search query construction to refine the music recommendations.
  - **User Interface:** Consider creating a user-friendly GUI / Front end to enhance the experience.
  - **Privacy:** Be mindful of privacy concerns when capturing and processing facial data.
  - **Performance:** Optimize the code for real-time performance, especially on resource-constrained devices.
  - **Error Handling:** Implement robust error handling to gracefully handle exceptions.

**Contribution**

We welcome contributions to this project. Feel free to fork the repository, make improvements, and submit pull requests.
We value all contributions, whether it's through code, documentation, creating demos or just spreading the word.
Here are a few useful resources to help you get started:
- For contributions, [Check out the contribution guide](https://github.com/SGCODEX/Music-Recommendation-Using-Facial-Expressions/blob/main/CONTRIBUTING.md) .

**License**

This project is licensed under the [MIT License](https://github.com/SGCODEX/Music-Recommendation-Using-Facial-Expressions/blob/main/LICENSE)

**Contact**

For any questions or issues, please contact us at shivampilot2004@gmail.com
