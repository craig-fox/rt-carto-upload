const request = require('request')
const _config = require('./config')

const main_query = `
  select master_id
        ,gz_id
        ,rt_id
        ,tomo_id
        ,rt_category_id
        ,case 
            when group_designation = 'sports' then 'Sports'
            when group_designation = 'nature' then 'Nature'
            when group_designation = 'history' then 'History'
            when group_designation = 'shopping' then 'Shopping' 
            when group_designation = 'entertainment' then 'Entertainment'
            when group_designation = 'towns' then 'Towns'
            when group_designation = 'accommodation' then 'Accomodation'
            when group_designation = 'services' then 'Services'
            when group_designation = 'attractions' then 'Attractions'
            when group_designation = 'food_drink' then 'Food & Drink'
            else 'Uncategorised' end as group_designation
        ,rt_subtitle
        ,rt_description
        ,rt_website
        ,gz_icon
        ,gz_poi_icon_id
        ,latitude
        ,longitude
        ,poi_name
        ,rt_address1
        ,rt_address2
        ,rt_legacy_city
        ,state
        ,rt_zip_code
        ,country
        ,tourism_region_name
        ,timezone
        ,last_updated
  from poi_master
  where tourism_region_name = 'Yorke Peninsula'
`

const payload = {
    "connector": {
      "provider": "postgres",
      "connection": {
        "server":_config.db.host,
        "database":_config.db.name,
        "username":_config.db.user,
        "password":_config.db.password
      },
      "table": _config.db.table,
      "sql_query": main_query
    }

    request.post(
        {
          url: _config.cartoUrl,
          form: payload
        },
        function (err, httpResponse, body) {
          console.log(err, body);
        }
    );