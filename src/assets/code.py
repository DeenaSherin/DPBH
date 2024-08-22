import numpy as np
import pandas as pd

dataFrame=pd.read_csv(r'E:/DPBH/TimerDataSet.csv')

product=input()

modified_dataFrame = dataFrame[dataFrame.PRODUCT == product]

if modified_dataFrame.empty:
    print(f"No data found for product: {product}")
else:
    # Filter True values based on the CONDITION column
    True_values = modified_dataFrame[modified_dataFrame.CONDITION == True]

    # Calculate True and False percentages
    total_rows = modified_dataFrame.shape[0]
    
    if total_rows != 0:
        True_percent = (True_values.shape[0] / total_rows) * 100
        False_percent = 100 - True_percent

        # Print the results
        print("True Percent: {:.2f}%\nFalse Percent: {:.2f}%".format(True_percent, False_percent))
    else:
        print("The modified DataFrame is empty. Unable to calculate percentages.")