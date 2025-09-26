import { useDataQuery } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';
import { 
    CircularLoader, 
    Menu, 
    MenuItem, 
    DataTable, 
    DataTableColumnHeader, 
    TableBody, 
    TableHead, 
    TableCell, 
    TableRow 
} from '@dhis2/ui';
import classes from "./App.module.css";


const dataQuery = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: 'id, displayName, created',
            paging: 'false'
        },
    }
}

const detailsQuery = {
  dataSet: {
    resource: 'dataSets',
    id: ({ id }) => id,
    params: {
        fields: 'id,displayName,created,dataSetElements[dataElement[id,displayName,created]]',
        paging: 'false',
    },
  },
}

export const Datasets = () => {

    const { loading: listLoading, error: listError, data: listData } = useDataQuery(dataQuery);

    const { isLoading, isError, data: detailsData, refetch } = useDataQuery(detailsQuery, {
        lazy: true
    });
    const [currentDataset, setCurrentDataset] = useState();


    function handleDatasetChange (dataset) {
        setCurrentDataset(dataset);
        refetch({ id: dataset.id});
    }

    if (listLoading) return <CircularLoader large/>;
    if (listError) return <div>Error: {listError.message}</div>;
    
    //console.log(listData);
    const datasets = listData.dataSets.dataSets ?? [];
    const details = detailsData?.dataSet;
    const childElements = details?.dataSetElements ?? [];

    if (detailsData) {
        console.log(detailsData.dataSet);
        //console.log(childElements);
    }

    return(
        <div className={classes.datasetContainer}>
            <div>
                <Menu>
                    {datasets.map((dataset) => {
                        return(
                            <MenuItem onClick={() => handleDatasetChange(dataset)} key={dataset.id} label={dataset.displayName}/>
                        );
                    })}
                </Menu>
            </div>
            <div>
                {currentDataset && 
                    <DataTable>
                        <TableHead>
                            <TableRow>
                                <DataTableColumnHeader large>Display Name</DataTableColumnHeader>
                                <DataTableColumnHeader large>ID</DataTableColumnHeader>
                                <DataTableColumnHeader large>Created</DataTableColumnHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{currentDataset.displayName}</TableCell>
                                <TableCell>{currentDataset.id}</TableCell>
                                <TableCell>{currentDataset.created}</TableCell>
                            </TableRow>
                        </TableBody>
                    </DataTable>
                }
                {isLoading && <CircularLoader />}
                {isError && <span>{isError.message}</span>}
                {detailsData &&
                    <DataTable>
                        <TableHead>
                            <TableRow>
                                <DataTableColumnHeader large>Display Name</DataTableColumnHeader>
                                <DataTableColumnHeader large>ID</DataTableColumnHeader>
                                <DataTableColumnHeader large>Created</DataTableColumnHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {childElements.map((elem) => {
                            return(
                                <TableRow>
                                    <TableCell>{elem.dataElement.displayName}</TableCell>
                                    <TableCell>{elem.dataElement.id}</TableCell>
                                    <TableCell>{elem.dataElement.created}</TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </DataTable>
                }
            </div>
        </div>
    );
}