// 应用中用到的路由集合
export default [ {
  path: '/interaction',
  component: require('./components/pages/interaction')
},
{
  path: '/courtesy',
  component: require('./components/pages/courtesy')
},
{
  path: '/personal',
  component: require('./components/pages/personal')
},
{
  path: '/personalMsg',
  component: require('./components/pages/personalMsg')
},
{
  path: '/bindTel',
  component: require('./components/pages/bindTel')
},
{
  path: '/bindMail',
  component: require('./components/pages/bindMail')
},
{
  path: '/addressList',
  component: require('./components/pages/addressList')
},
{
  path: '/addAddress',
  component: require('./components/pages/addAddress')
},
{
  path: '/myActivity',
  component: require('./components/pages/myActivity')
},
{
  path: '/integralPrize',
  component: require('./components/pages/integralPrize')
},
{
  path: '/noActivity',
  component: require('./components/pages/noActivity')
},
{
  path: '/listProvince',
  component: require('./components/pages/province')
},
{
  path: '/listCity',
  component: require('./components/pages/city')
},
{
  path: '/vipCard',
  component: require('./components/pages/vipCard')
},
{
  path: '/allActivities',
  component: require('./components/pages/allActivity')
},
{
  path: '/listRegion',
  component: require('./components/pages/region')
},
{
  path: '/sign/actDetail',
  component: require('./components/activities/signActivity')
},
{
  path: '/favor/actDetail',
  component: require('./components/activities/favorActivity')
},
{
  path: '/sharePacking/actDetail',
  component: require('./components/activities/sharePackingActivity')
},
{
  path: '/draw/actDetail',
  component: require('./components/activities/drawActivity')
},
{
  path: '/sharePacking/task',
  component: require('./components/activities/openPackage')
},
{
  path: '/activity/overdue',
  component: require('./components/pages/overdue')
},
{
  path: '/activity/noStart',
  component: require('./components/pages/activityNoStart')
},
{
  path: '/activity/actDetail',
  component: require('./components/activities/activity')
}]
