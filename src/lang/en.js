export default {
  route: {
		user:"user",
    // 平台端
    memberManagement:'memberManagement',
    storeList:'storeList',
  	//报表管理
  	statement:'报表管理',
  	DailyReport:'日结报表',
  	InTransitDocuments:'在途单据',
		RetailReport:'零售报表',
		InventoryStatistics:'库存统计',
		WarehouseInAndOut:'仓库进出存',
		StoreInAndOut:'店铺进出存',
  	//财务管理
  	financial:'财务管理',
  	CostOfGoods:'CostOfGoods',
  	AccountPayable:'AccountPayable',
    Otherbillsofpayment:'其他支出单',
    otherReceipts:'其他收入单',
    deposit:'定金',
  	//销售管理
  	sell:'销售管理',
  	retail:'零售开票',
  	CashierInventory:'CashierInventory',
  	sales:'销货订单',
  	cashierWatch:'cashierWatch',
  	successionTable:'successionTable',
  	//购货管理
    purchase:'purchase',
    PurchasingSystem:"PurchasingSystem",
  	PurchasingManagement:'PurchasingManagement',
  	PurchaseReturn:'PurchaseReturn',
  	PurchaseOrder:'PurchaseOrder',
  	//仓库管理
  	PurchaseWarehouseEntryForm:'PurchaseWarehouseEntryForm',
  	AllocatingStorage:'AllocatingStorage',
  	AllocatingOutbound:'AllocatingOutbound',
  	TheOverflowOfSingle:'TheOverflowOfSingle',
  	GoodsInTransit:'GoodsInTransit',
  	ReportedLossOfSingle:'ReportedLossOfSingle',
  	StockTaking:'StockTaking',
  	InventoryList:'InventoryList',
  	storage:'storage',
  	//商品管理
  	BarCodeManagement:'BarCodeManagement',
  	ProductRegistration:'ProductRegistration',
  	SpecificationOfGoods:'SpecificationOfGoods',
  	BrandList:'BrandList',
  	ProductTypes:'ProductTypes',
  	ProductManagement:'ProductManagement',
  	//店铺管理
  	StaffFiles:'StaffFiles',
  	RoleManagement:'RoleManagement',
  	CustomerList:'CustomerList',
  	contactManagement:'contactManagement',
  	//基础设置
  	basicSetting:'BasicSetting',
  	storeFiles:'StoreFiles',
  	personalFiles:'personalFiles',
  	//系统设置
  	systemSettings:'SystemSettings',
  	membershiplist:'Membershiplist',
  	Permissionslist:'Permissionslist',
  	Organizationlist:'Organizationlist',
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    nested: 'Nested Routes',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    form: 'Form',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    theme: 'Theme',
    externalLink: 'External Link'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    phone:"Phone",
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  }
}
