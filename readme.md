Using Roboflow API for automated cell counting in microscopic images.

1. Organize ground truth annotations into a Map for easier filtering.
2. Read and encodes each image file into base64, and sends to Roboflow API for detection.
3. Store predicted cell counts and calculates ground truth counts post-processing.
4. 
4. Output ground truth and predicted counts for comparison.

HOW TO TEST:

Open terminal and navigate to the `script.js` file directory and run `node script.js`


Suggested improvements:

Solves for: "Dide we predict the same amount?"

Next step is: "Did we predict the same location?"

Next step is: "How well did we predict the closeness?".

Security: Add the .env file.

Be aware of that you'll need to know the diff between object classification and segmentation. Location based solution.

- Using the bounding box coordinates to better predict the data. Not only the count but also the LOCATION to verify and prevent false positives.
