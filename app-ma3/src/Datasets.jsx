import { useDataQuery } from '@dhis2/app-runtime';
import { CircularLoader, Menu, MenuItem } from '@dhis2/ui';



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
    

    if (isLoading) {
        return(
            <CircularLoader />
        );
    }
    if (isError) {
        return(
            <div>Error: {isError.message}</div>
        );
    }
    if (!data) return;
    console.log(data);
    
    console.log(data.dataSets.dataSets);
    const datasets = data.dataSets.dataSets;

    const DatasetList = () => {
        return(
            <Menu>
                {datasets.map((dataset) => {
                    return(
                        <MenuItem>{dataset.displayName}</MenuItem>
                    );
                })}
            </Menu>
        );
    }


    return(
        <Menu>
            {datasets.map((dataset) => {
                return(
                    <MenuItem label={dataset.displayName}/>
                );
            })}
        </Menu>
    );
}