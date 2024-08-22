from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/get_output', methods=['POST'])
def get_output():
    try:
        product = request.json['product'] #entered (typed) product in home page
        
        # Your existing Python code here...
        dataFrame = pd.read_csv(r'E:/DPBH/TimerDataSet.csv')

        modified_dataFrame = dataFrame[dataFrame.PRODUCT == product]

        if modified_dataFrame.empty:
            print(f"No data found for product: {product}")
        else:
            # Filter True values based on the CONDITION column
            True_values = modified_dataFrame[modified_dataFrame.CONDITION == True]

            # Calculate True and False percentages, shape[0] - says no of rows
            total_rows = modified_dataFrame.shape[0]

            if total_rows != 0:
                True_percent = (True_values.shape[0] / total_rows) * 100
                False_percent = 100 - True_percent
                print("True Percent: {:.2f}%\nFalse Percent: {:.2f}%".format(True_percent, False_percent))
            else:
                print("The modified DataFrame is empty. Unable to calculate percentages.")

            # Replace the following line with the data you want to send to the frontend
            output_data = {"True_percent": True_percent, "False_percent": False_percent}

            return jsonify(output_data)
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "An error occurred while processing the request."})

if __name__ == '__main__':
    app.run(port=5500)
