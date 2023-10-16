function formatDate(date){
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2 ) month = '0' + month;
    if ( day.length < 2 ) day = '0' + day;

    return [year, month, day].join('-');
};

function allowedRoles(){
    return {
        "admin": 1,
        "user": 2,
        "employee": 3
    };
};

module.exports = {
    formatDate,
    allowedRoles
};
