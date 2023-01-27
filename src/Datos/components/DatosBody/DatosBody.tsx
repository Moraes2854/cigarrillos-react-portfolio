import { CustomDatePicker, LoadingSpinner } from "../../../common/components";
import { useDatosBody } from "../../hooks/useDatosScreen";
import { DatosSelect } from "../DatosSelect/DatosSelect";

export const DatosBody = () => {


    const {
        initDate,
        endDate,
        onInitDateChange,
        onEndDateChange,
        currentOption, 
        datosOptions, 
        onOptionChange, 
        selectRef,
        currentDato:currentResponse,
        onButtonClick,
    } = useDatosBody();


    
  return (
    <>
        <DatosSelect 
            selectRef={selectRef} 
            options={datosOptions} 
            onChange={onOptionChange} 
            currentOption={currentOption}
        />

        {
            (currentOption.datepickers > 0 ) && 

            (currentOption.datepickers === 1) ?

                <div className="mt-2">
                    <label className='custom-label'>Fecha</label>
                    <CustomDatePicker date={initDate} onChange={onInitDateChange}/>
                </div>
            : 
            (currentOption.datepickers === 2) &&

                <div className="mt-2">
                    <div className="row">

                        <div className="col">
                            <label className='custom-label'>Fecha inicial</label>
                            <CustomDatePicker date={initDate} onChange={onInitDateChange}/>
                        </div>

                        <div className="col">
                            <label className='custom-label'>Fecha final:</label>
                            <CustomDatePicker date={endDate} onChange={onEndDateChange}/>
                        </div>

                    </div>
                </div>

        }
        
        <div className="mt-2">
            <button 
                className="custom-button consultar-datos"
                onClick={onButtonClick}
            >
                <i className="fa-solid fa-magnifying-glass pe-2"></i>
                Consultar              
            </button>
        </div>
        {
            (currentResponse) &&
            <div className="mt-2 table-responsive">
                <table className="table caption-top table-dark table-striped table-bordered border-dark align-middle text-center">
                    {(currentResponse.caption) && <caption className="custom-label">{currentResponse.caption}</caption>}

                    <thead>

                        <tr>
                            <th scope="col">{currentResponse.tableHeader1}</th>
                            <th scope="col">{currentResponse.tableHeader2}</th>
                        </tr>

                    </thead>

                    <tbody>
                        {
                            currentResponse.data.map((data, index)=>(
                                <tr key={`${index}${data.tableData1}${data.tableData2}tr`}>
                                    <td>
                                        {data.tableData1}
                                    </td>
                                    <td>
                                        {data.tableData2}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        }
    </>
  )
}