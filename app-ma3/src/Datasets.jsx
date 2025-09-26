import { useDataQuery } from '@dhis2/app-runtime';
import { useState } from 'react';
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

export const Datasets = () => {

    const { isLoading, isError, data } = useDataQuery(dataQuery);
    const [currentDataset, setCurrentDataset] = useState();


    function handleDatasetChange (dataset) {
        setCurrentDataset(dataset);
    }

    if (isLoading) {
        return(
            <CircularLoader large/>
        );
    }
    if (isError) {
        return(
            <div>Error: {isError.message}</div>
        );
    }
    if (!data) return;
    
    const datasets = data.dataSets.dataSets;

    return(
        <div className={classes.datasetContainer}>
            <div>
                <Menu>
                    {datasets.map((dataset, index) => {
                        return(
                            <MenuItem onClick={() => handleDatasetChange(dataset)} key={index} label={dataset.displayName}/>
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
            </div>
        </div>
    );
}