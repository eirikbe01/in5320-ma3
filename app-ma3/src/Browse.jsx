import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader, DataTableColumnHeader, TableBody, TableFoot, TableHead, TableRow} from '@dhis2/ui';
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
};


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

  if (data) {
    console.log(data);
  }

  const mergedData = mergeData(data);

  return(
    <>
    <h1>Browse</h1>
    <DataTable>
      <TableHead>
        <TableRow>
          <DataTableColumnHeader large>Display Name</DataTableColumnHeader>
          <DataTableColumnHeader large>Value</DataTableColumnHeader>
          <DataTableColumnHeader large>ID</DataTableColumnHeader>
        </TableRow>
      </TableHead>
      <TableBody>
      </TableBody>
    </DataTable>
    </>
  );
}
