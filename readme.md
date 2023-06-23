# Automated Cell Counting with Roboflow API

This repository provides a script for using the Roboflow API to automate cell counting in microscopic images. Here's a quick overview of the process:

1. **Annotation Organization:** The script first organizes ground truth annotations into a Map for easier filtering and processing.
2. **Image Processing:** Each image file is then read, encoded into base64, and sent to the Roboflow API for cell detection.
3. **Cell Counting:** The script stores the predicted cell counts and also calculates ground truth counts for post-processing.
4. **Comparison of Results:** Finally, it outputs both the ground truth and predicted counts for comparison.

## How to Run the Script

To test the script, open your terminal, navigate to the directory containing the `script.js` file, and run the following command:

```bash
node script.js
```

## Future Improvements and Considerations

Here are a few points for future improvements and considerations:

- **Validation:** The script currently solves for "Did we predict the same amount?" The next steps include addressing "Did we predict the same location?" and "How well did we predict the closeness?"
- **Security:** Add the `.env` file to securely store sensitive data like API keys.
- **Pre-requisites:** You should be aware of the differences between object classification and segmentation, especially in the context of location-based solutions.
- **Better Predictions:** Consider using bounding box coordinates to enhance prediction accuracy. This will not only improve the cell count prediction but also verify the location to prevent false positives.
