
class AlarmData {
    map( medicine, illness, icon_type, measurement_type, dose_type , alarm, dose  ) {
        return {
            medicine : {
                "value" : medicine.code,
                "name" : medicine.name
            },
            alarm : {
                "id": alarm.id,
                "active" : true,
                "first_take" : dose.first_take
            },
            dose : {
                "dose_type" : dose_type.value,
                "dose_type_name" : dose_type.label,
                "icon_type" : icon_type.value,
                "icon_type_name" : icon_type.label,
                "measurement_type" : measurement_type.value,
                "measurement_type_name" : measurement_type.label,
                "grammage" : dose.grammage,
                "quantity" : dose.quantity,
                "period" : dose.period,
                "duration": dose.duration
            },
            illness : {
                "type": illness.code,
                "name" : illness.name
            }
        }
    }
}


module.exports = new AlarmData();