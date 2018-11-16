# -*- coding: utf-8 -*-
"""
Created on Fri Nov 16 11:41:34 2018

@author: G1ks
"""
import requests
import json
from time import sleep
from azure.cosmosdb.table.tableservice import TableService

class Current_sync:
    height=0
    #used DB Key
    count=1
    
    # no data to being inited
    def __init__(self):
        pass

def addr_query(addr):
    URL="http://localhost:2442/api/v1/wallet/"+addr+"/txs/0"
    response=requests.get(URL)
    print(response.status_code)
    print(response.text) #result
    
#addr_query("H2ijDbEM1yRmVD7EjXHZhXGy7wSA9DRVQ") #fine
        
def getHighestBlockInfo():
    URL="http://localhost:2442/api/v1/toptipHeight"
    response=requests.get(URL).text
    parsed_data=json.loads(response)
    return parsed_data

# Get block info with specific block height
# Input type: integer
# return type: list of transactions
def getBlockInfo(block_number):
    print('start')
    URL="http://localhost:2442/api/v1/block/height/"+str(block_number)
    # no need params={'height': 4}
    response=requests.get(URL).text
    parsed_data=json.loads(response)
    print(parsed_data['txs']) # tx is dictionary
    return parsed_data
    
def DBUpdate(updated_block, new_block):
    updated_block=updated_block+1
    for current_block in range(updated_block, new_block+1):
        # Get tx list of current_block
        print('[Traversing] block is confirmed!')
        tx_list=getBlockInfo(current_block)['txs']
        if len(tx_list)!=0:
            #Insert tx data in databse
            #{Patient id, emr, emrID, time, opration, comment}
            for tx in tx_list:
                # if tx is not reward transaction, tx is dictionary type
                # real data: if tx['opration']!='2':
                print('[Update] emr data is added!')
                tx_insert=dict()
                tx_insert['RowKey']=str(latest.count)
                tx_insert['PartitionKey']='EMR'
                tx_insert['patientID']=tx['to']
                tx_insert['hospitalID']=tx['from']
                tx_insert['patientID']=tx['emr']
                tx_insert['emrID']=tx['emrID']
                tx_insert['time']=tx['time']
                #tx_insert['operation']=tx['operation']
                #tx_insert['comment']:tx['comment']
                DBInsert(tx_insert)
            
                
# called by DBUpdate
def DBInsert(tx):
    latest.count=latest.count+1
    the_connection_string = "DefaultEndpointsProtocol=https;AccountName=grand-challenge;AccountKey=zG8AM0FVzaE0cPcQ1NMYPxjE7tSTEQSPvl0CwWlLRTn10ixYlYMF6KFU36dt4D00e66QUoF01hBx0DdNTEtnqQ==;TableEndpoint=https://grand-challenge.table.cosmosdb.azure.com:443/;"
    table_service=TableService(endpoint_suffix = "table.cosmosdb.azure.com", connection_string= the_connection_string)
    table_service.insert_entity('EMR',tx)

#Main
print('[Hycon X BMCord] Hi Grand-challenge.')
latest=Current_sync()
while(True):
    sleep(2) # 20s sleep
    if latest.height != getHighestBlockInfo()['height'] :
        #Update databse
        DBUpdate(latest.height, getHighestBlockInfo()['height'])
        latest.height=getHighestBlockInfo()['height']
        print("[Update] height is updated to "+getHighestBlockInfo()['height']+"!")