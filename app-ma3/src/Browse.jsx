import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader, DataTableColumnHeader, TableBody, TableFoot, TableHead, TableRow, TableCell} from '@dhis2/ui';
import { DataTable } from '@dhis2/ui';



function mergeData(data) {
  return data.dataSets.dataSetElements.map(d => {
      let matchedValue = data.dataValueSets.dataValues.find(dataValues => {
          if (dataValues.dataElement == d.dataElement.id) {
              return true
          }
      });

      return {
          displayName: d.dataElement.displayName,
          id: d.dataElement.id,
          value: matchedValue.value,
      };
  });
}

const dataQuery = {
    dataSets: {
        resource: 'dataSets/aLpVgfXiz0f',
        params: {
            fields: [
                'name',
                'id',
                'dataSetElements[dataElement[id, displayName]',
            ],
        },
    },
    dataValueSets: {
        resource: 'dataValueSets',
        params: {
            orgUnit: 'KiheEgvUZ0i',
            dataSet: 'aLpVgfXiz0f',
            period: '2020',
        },
    },
}


export function Browse() {

  const { isLoading, isError, data } = useDataQuery(dataQuery);

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

  if (!data) {
    return;
  }

  const mergedData = mergeData(data);
  console.log(mergedData);

  return(
    <DataTable>
      <TableHead>
        <TableRow>
          <DataTableColumnHeader large>Display Name</DataTableColumnHeader>
          <DataTableColumnHeader large>Value</DataTableColumnHeader>
          <DataTableColumnHeader large>ID</DataTableColumnHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {mergedData.map((row, index) => {
          return(
            <TableRow key={index}>
              <TableCell>{row.displayName}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.id}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </DataTable>
  );
}
