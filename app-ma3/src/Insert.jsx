import React from "react";
import { ReactFinalForm, SingleSelectFieldFF, Button, InputFieldFF, CircularLoader } from '@dhis2/ui';
import { useDataMutation } from '@dhis2/app-runtime';


const dataMutationQuery = {
    resource: 'dataValueSets',
    type: 'create',
    dataSet: 'aLpVgfXiz0f',
    data: ({ value, dataElement, period, orgUnit }) => ({
        dataValues: [
            {
                dataElement: dataElement,
                period: period,
                orgUnit: orgUnit,
                value: value,
            },
        ],
    }),
}

export function Insert() {

  const [mutate, { isLoading, isError }] = useDataMutation(dataMutationQuery);
  async function onSubmit(formInput) {
    await mutate({
      value: formInput.value,
      dataElement: formInput.dataElement,
      period: '2020',
      orgUnit: 'KiheEgvUZ0i',
    });
  console.log(formInput);
  }

  if (isLoading) {
    return(<CircularLoader />);
  }
  if (isError) {
    return (
      <div>{isError.message}</div>
    );
  }
  return(
    <div>
        <h1>Form</h1>

        <ReactFinalForm.Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                      <ReactFinalForm.Field
                          name="dataElement"
                          label="Data Element"
                          component={SingleSelectFieldFF}
                          initialValue="none"
                          options={[
                              { label: "Total Population", value: "WUg3MYWQ7pt" },
                              { label: "Population of women of child bearing age (WRA)", value: "vg6pdjObxsm",},
                              { label: "Total population < 5 years    ", value: "DTtCy7Nx5jH" },
                              { label: "Expected pregnancies", value: "h0xKKjijTdI" },
                              { label: "Total population < 1 year ", value: "DTVRnCGamkV" },
                              { label: "None", value: "none" },
                              ]}
                      />
                    
                    <ReactFinalForm.Field
                        name="value"
                        label="Value"
                        component={InputFieldFF}
                    />
                    <Button type="submit" primary>
                        Submit form
                    </Button>
                </form>
            )}
        </ReactFinalForm.Form>
    </div>
  );
}
