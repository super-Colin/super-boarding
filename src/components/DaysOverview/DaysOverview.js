import DayColumn from './DayColumn';
import KennelLabelsColumn from './KennelLabelsColumn';


const DaysOverview = ({dates, kennelSettings}) => { // Notice that we are destructuring the input object

    // console.log('DayOverview is receiving:', dates);
    // console.log('DayOverview is receiving:', typeof(dates));
    // console.log('--------------------------------------');

    return (
        <div className="daysOverview_container" >
            <KennelLabelsColumn kennelSettings={kennelSettings} />
            {dates.map((date)=>
                <div key={date.date} className="daysOverview_column" >
                    <h2>{date.date}</h2>
                    <DayColumn staysForDay={date.stays} kennelSettings={kennelSettings} /> 
                </div>
            )}
        </div>
    )
}

export default DaysOverview
