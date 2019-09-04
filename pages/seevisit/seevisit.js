// pages/seevisit/seevisit.jsconst $common = require('../../../utils/common.js');
const $api = require('../../utils/api.js')
const $common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    VrId:"",
    edit:false,
    openSetting: true, //定位授权
    video: $api.video, //视频拼接
    Images: $api.Images, //图片拼接
    id: '',
    VrId: '',
    Use: false,
    focus: {},
    Name: '', //客户名称
    Contacts: '', //联系人
    phonenumber: '', //联系电话
    TalksTime: '', //会谈时间
    WayTime: '', //路途时间
    content: '', //具体内容
    Compressorxing: '', //压缩机型号
    Compressorpin: '', //压缩机品牌
    Compressornum: '', //压缩机数量
    Accessoryxing: '', //附属设备型号
    Accessorypin: '', //附属设备品牌
    Accessorynum: '', //附属设备数量
    Situationyun: '', //空压机运行时间
    Situationjia: '', //空压机加载时间
    Situationping: '', //空压机客户评价
    Situationcai: '', //空压机采购时间
    start: '1970-01-01',
    end: '',
    InnerTime: '', //拜访日期
    Division: ['OIS Visit', 'CTS Visit'], //Division
    division: '',
    visits: ['直销终端客户', '直销OEM客户', '拜访代理商/经销商', '代理商/经销商的终端客户', '代理商/经销商的OEM客户', '中间商', '工程公司', '设计院'], //拜访类型
    visit: '',
    objectives: [
      '直销\零件合约',
      '直销\FP定价工程项目',
      '直销\8000或16000小时保养',
      '直销\转子大修',
      '直销\SP年度保养',
      '直销\节能及管道',
      '间销\零件合约',
      '间销\转子大修',
      '间销\节能及管道',
      'OIS Machine',
    ], //目的
    objective: '',
    plans: [
      '直销：初次拜访,了解客户需求',
      '直销：提交报价,报价协商',
      '直销：商务谈判',
      '直销：签订合同',
      '直销：合同执行',
      '直销：应收款',
      '直销：投诉处理',
      '间销：发展潜在代理商',
      '间销：代理商沟通',
      '间销：代理商客户客户拜访',
      '间销：代理商培训',
      '例行拜访',
    ], //拜访计划
    plan: '',
    Results: [
      '直销：已拜访，了解需求',
      '直销：已拜访，提供了报价',
      '直销：已拜访，未提供报价',
      '直销：已拜访，有签单',
      '直销：已拜访，未签单',
      '直销：合同执行中',
      '直销：收款有进展',
      '直销：收款无进展',
      '直销：收款成功',
      '直销：投诉解决中',
      '直销：投诉已解决',
      '间销：该代理商有潜力，可发展',
      '间销：代理商沟通无进展',
      '间销：代理商客户客户拜访已完成',
      '间销：代理商培训已完成',
      '间销：代理商培训未完成',
    ], //拜访结果
    Result: '',
    imageList: [], //图片列表
    imageMaxNum: 5, //图片最大数量
    VideoList: [], //视频列表
    VideoMaxnum: 5,
    Location: '', //定位地址
    listData: '',
    VrCreateTime: '', //拜访日期
    VrVisitingDate: '',
    VrAirCompressorUsePurchase: '', //采购时间
    CompressorUsePurchase: '', //采购时间
    play: 1, //视频播放
    videosrc: '',
    AnnualMachine: "", //年度任务完成情况整机台数完成率
    AnnualService: "", //年度任务完成情况服务金额完成率
    InHandMachine: "", //在手项目情况整机在手项目台数
    InHandService: "", //在手项目情况服务在手项目金额
    Matchings: [
      "是",
      "否"
    ], //是否配套
    Matching: "",
    SupportingBrands: "", //客户现状配套品牌
    SupportingScale: "", //客户现状配套规模
    Opportunitys: [
      "0%", "20%", "50%", "80%", "100%"
    ], //我的机会
    Opportunity: '',
    DesignOpportunity: "", //设计院信息主要针对行业
    DesignCompetitive: "", //设计院信息主要竞争品牌
    MiddlemanOpportunity: "", //中间商主要针对行业
    MiddlemanCompetitive: "", //中间商主要竞争品牌
    SaleNumber: "", //中间商过去三年平均空压机年销售台数
    HideOthers: 0,
  },
  //日期选择
  bindDateChange: function(e) {
    this.setData({
      InnerTime: e.detail.value
    })
  },
  //采购时间
  CompressorUsePurchase: function(e) {
    this.setData({
      CompressorUsePurchase: e.detail.value
    })
  },
  //Division
  division(e) {
    this.setData({
      division: e.detail.value,
    })
  },
  //拜访类型
  visit(e) {
    // ['直销终端客户', '直销OEM客户', '拜访代理商/经销商', '代理商/经销商的终端客户', '代理商/经销商的OEM客户', '中间商', '工程公司', '设计院']
    let HideOthers = ""
    switch (this.data.visits[e.detail.value]) {
      case "直销终端客户":
      case "代理商/经销商的终端客户":
        HideOthers = 0;
        break;
      case "直销OEM客户":
      case "代理商/经销商的OEM客户":
        HideOthers = 1;
        break;
      case "拜访代理商/经销商":
        HideOthers = 2;
        break;
      case "中间商":
      case "工程公司":
        HideOthers = 3;
        break;
      case "设计院":
        HideOthers = 4;
        break;
    }
    this.setData({
      visit: e.detail.value,
      HideOthers
    })
  },
  //目的
  objective(e) {
    this.setData({
      objective: e.detail.value
    })
  },
  //拜访计划
  plan(e) {
    this.setData({
      plan: e.detail.value
    })
  },
  //拜访结果
  Result(e) {
    this.setData({
      Result: e.detail.value
    })
  },
  // 客户现状是否配套
  Matching(e) {
    this.setData({
      Matching: e.detail.value
    })
  },
  // LIUTECH品牌的机会
  Opportunity(e) {
    this.setData({
      Opportunity: e.detail.value
    })
  },
  addImage() { //选择添加图片
    let {
      imageMaxNum,
      imageList
    } = this.data
    $common.chooseImage(imageMaxNum - imageList.length)
      .then(res => {
        $common.loading('上传中...')
        let imageList = this.data.imageList
        let tempFilePaths = res.tempFilePaths
        return Promise.all(tempFilePaths.map(item => $common.uploadImage(item))).then(res => {
          // let img=[]
          for (let i = 0; i < res.length; i++) {
            imageList.push(JSON.parse(res[i].data).msg)
          }
          this.setData({
            imageList
          })
        })
      })
      .then(res => {
        $common.hide()
      })
  },
  deleteImage(e) {
    let img = [];
    for (let i = 0; i < this.data.imageList.length; i++) {
      img.push(this.data.Images + this.data.imageList[i])
    }
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: img // 需要预览的图片http链接列表
    })
  },
  addvalue() { //选择添加视频
    let {
      VideoMaxnum,
      VideoList
    } = this.data
    $common.chooseVideo(VideoMaxnum - VideoList.length)
      .then(res => {
        $common.loading('上传中...')
        let VideoList = this.data.VideoList
        let tempFilePath = res.tempFilePath
        // VideoList.push(tempFilePath)
        // this.setData({
        //   VideoList
        // })
        return $common.uploadVideo(res.tempFilePath).then(res => {
          VideoList.push(JSON.parse(res.data).msg)
          this.setData({
            VideoList
          })
        })
      })
      .then(res => {
        $common.hide()
      })
  },
  end() {
    this.setData({
      play: 1
    })
  },
  play(e) {
    this.setData({
      videosrc: e.target.dataset.src,
      play: 2
    })
  },
  toast(str) {
    $common.showToast(str)
  },
  getFocus(key) { //使其主动获得焦点
    let {
      focus
    } = this.data
    if (!focus[key]) focus[key] = false
    let keys = `focus.${key}`
    this.setData({
      [keys]: true
    })
  },
  test(num) {
    return (num) => (!(/(^[1-9]\d*$)/.test(num)))
  },
  Submission(data) { //判断所填信息是否完善
    let t = $common.trim(data)
    let HideOthers = this.data.HideOthers;
    switch (false) {
      case t('Name'):
        return (this.getFocus('Name'), this.toast('请完善客户名称'));
        break
      case t('Contacts'):
        return (this.getFocus('Contacts'), this.toast('请输入联系人'));
        break
      case t('phonenumber'):
        return (this.getFocus('phonenumber'), this.toast('请输入联系电话'));
        break
      case t('InnerTime'):
        return this.toast('请完善拜访日期');
        break
      case t('division'):
        return this.toast('请完善Division');
        break
      case t('visit'):
        return this.toast('请完善拜访类型');
        break
      case t('objective'):
        return this.toast('请完善目的');
        break
      case t('plan'):
        return this.toast('请完善拜访计划');
        break
      case t('Result'):
        return this.toast('请完善拜访结果');
        break
      case t('TalksTime'):
        return (this.getFocus('TalksTime'), this.toast('请完善会谈时间'));
        break
      case t('WayTime'):
        return (this.getFocus('WayTime'), this.toast('请完善路途时间'));
        break
      case t('content'):
        return (this.getFocus('content'), this.toast('请完善具体内容'));
        break
    }
    if (HideOthers == 0) {
      switch (false) {
        case t('Compressorxing'):
          return (this.getFocus('Compressorxing'), this.toast('请完善压缩机产品型号'));
          break
        case t('Compressorpin'):
          return (this.getFocus('Compressorpin'), this.toast('请完善压缩机产品品牌'));
          break
        case t('Compressornum'):
          return (this.getFocus('Compressornum'), this.toast('请完善压缩机产品数量'));
          break
        case t('Accessoryxing'):
          return (this.getFocus('Accessoryxing'), this.toast('请完善附属设备型号'));
          break
        case t('Accessorypin'):
          return (this.getFocus('Accessorypin'), this.toast('请完善附属设备品牌'));
          break
        case t('Accessorynum'):
          return (this.getFocus('Accessorynum'), this.toast('请完善附属设备数量'));
          break
        case t('Situationyun'):
          return (this.getFocus('Situationyun'), this.toast('空压机设备使用情况运行时间'));
          break
        case t('Situationjia'):
          return (this.getFocus('Situationjia'), this.toast('空压机设备使用情况加载时间'));
          break
        case t('Situationping'):
          return (this.getFocus('Situationping'), this.toast('空压机设备使用情况客户评价'));
          break
        case t('CompressorUsePurchase'):
          return this.toast('空压机设备使用情况采购时间');
          break
        default:
          return true
      }
    } else if (HideOthers == 1) {
      switch (false) {
        case t('Matching'):
          return this.toast('请完善是否配套');
          break
        case t('SupportingBrands'):
          return (this.getFocus('SupportingBrands'), this.toast('客户现状配套品牌'));
          break
        case t('SupportingScale'):
          return (this.getFocus('SupportingScale'), this.toast('客户现状配套规模'));
          break
        case t('Opportunity'):
          return this.toast('请完善我的机会');
          break
        default:
          return true
      }
    } else if (HideOthers == 2) {
      switch (false) {
        case t('AnnualMachine'):
          return (this.getFocus('AnnualMachine'), this.toast('年度任务完成情况整机台数完成率'));
          break
        case t('AnnualService'):
          return (this.getFocus('AnnualService'), this.toast('年度任务完成情况服务金额完成率'));
          break
        case t('InHandMachine'):
          return (this.getFocus('InHandMachine'), this.toast('在手项目情况整机在手项目台数'));
          break
        case t('InHandService'):
          return (this.getFocus('InHandService'), this.toast('在手项目情况服务在手项目金额'));
          break
        default:
          return true
      }
    } else if (HideOthers == 3) {
      switch (false) {
        case t('MiddlemanOpportunity'):
          return (this.getFocus('MiddlemanOpportunity'), this.toast('中间商主要针对行业'));
          break
        case t('MiddlemanCompetitive'):
          return (this.getFocus('MiddlemanCompetitive'), this.toast('中间商主要竞争品牌'));
          break
        case t('SaleNumber'):
          return (this.getFocus('SaleNumber'), this.toast('过去三年平均空压机年销售台数'));
          break
        default:
          return true
      }
    } else if (HideOthers == 4) {
      switch (false) {
        case t('DesignOpportunity'):
          return (this.getFocus('DesignOpportunity'), this.toast('设计院信息主要针对行业'));
          break
        case t('DesignCompetitive'):
          return (this.getFocus('DesignCompetitive'), this.toast('设计院信息主要竞争品牌'));
          break
        default:
          return true
      }
    }
  },
  //提交
  submit(e) {
    let VrIsSubmission = +e.detail.target.dataset.vrissubmission; //是否已提交   0：保存  1：提交
    let data = e.detail.value
    console.log(data)
    let {
      VrId,
      id,
      Name,
      Contacts,
      phonenumber,
      InnerTime,
      Division,
      division,
      visits,
      visit,
      objectives,
      objective,
      plans,
      plan,
      Results,
      Result,
      TalksTime,
      WayTime,
      content,
      imageList,
      VideoList,
      Location,
      Compressorxing,
      Compressorpin,
      Compressornum,
      Accessoryxing,
      Accessorypin,
      Accessorynum,
      Situationyun,
      Situationjia,
      Situationping,
      CompressorUsePurchase,
      AnnualMachine, //年度任务完成情况整机台数完成率
      AnnualService, //年度任务完成情况服务金额完成率
      InHandMachine, //在手项目情况整机在手项目台数
      InHandService, //在手项目情况服务在手项目金额
      Matchings, //是否配套
      Matching,
      SupportingBrands, //客户现状配套品牌
      SupportingScale, //客户现状配套规模
      Opportunitys, //我的机会
      Opportunity,
      DesignOpportunity, //设计院信息主要针对行业
      DesignCompetitive, //设计院信息主要竞争品牌
      MiddlemanOpportunity, //中间商主要针对行业
      MiddlemanCompetitive, //中间商主要竞争品牌
      SaleNumber, //中间商过去三年平均空压机年销售台数
      HideOthers,
    } = this.data
    data.visit = visits[visit] || ''
    data.division = Division[division] || ''
    data.InnerTime = InnerTime || ''
    data.objective = objectives[objective] || ''
    data.Result = Results[Result] || ''
    data.plan = plans[plan] || ''
    data.Matching = Matchings[Matching] || ''
    data.Opportunity = Opportunitys[Opportunity] || ''
    data.CompressorUsePurchase = CompressorUsePurchase || ''
    if (!this.Submission(data, HideOthers) && VrIsSubmission == 1) return
    if (data.Compressornum != '' && data.Compressornum != 0 && HideOthers == 0 && VrIsSubmission == 1) {
      if (!(/^[1-9]+[0-9]*]*$/.test(data.Compressornum))) return this.toast('压缩机产品数量只能是正整数字')
    }
    if (data.Accessorynum != '' && data.Accessorynum != 0 && HideOthers == 0) {
      if (!(/^[1-9]+[0-9]*]*$/.test(data.Accessorynum))) return this.toast('附属设备数量只能是正整数字')
    }
    if (imageList.length < 1 && VrIsSubmission == 1) return this.toast('请完善上传图片')
    if (Location == '' && VrIsSubmission == 1) return this.toast('请完善定位')
    $common.loading('正在提交')
    let VisiEntity = {
      VrId,
      VrIsSubmission,
      VrCustId: id,
      VrCustName: data.Name,
      VrContacts: data.Contacts,
      VrContactNumber: data.phonenumber,
      VrVisitingDate: InnerTime,
      VrDivision: Division[division] == undefined ? "" : Division[division],
      VrCategory: visits[visit] == undefined ? "" : visits[visit],
      VrObjective: objectives[objective] == undefined ? "" : objectives[objective],
      VrVisitPlan: plans[plan] == undefined ? "" : plans[plan],
      VrVisitingResults: Results[Result] == undefined ? "" : Results[Result],
      VrMeetingTime: data.TalksTime,
      VrJourneyTime: data.WayTime,
      VrContent: data.content,
      VrPhoto: imageList.join('|'),
      VrVideo: VideoList.join('|'),
      VrLocation: Location,
      VrCompressorModel: data.Compressorxing,
      VrCompressorBrand: data.Compressorpin,
      VrCompressorNum: data.Compressornum,
      VrEquipmentModel: data.Accessoryxing,
      VrEquipmentBrand: data.Accessorypin,
      VrEquipmentNum: data.Accessorynum,
      VrAirCompressorUseRun: data.Situationyun,
      VrAirCompressorUseLoad: data.Situationjia,
      VrAirCompressorUseEvaluate: data.Situationping,
      VrAirCompressorUsePurchase: CompressorUsePurchase,
      VrNumCompletionRate: data.AnnualMachine == undefined ? 0 : data.AnnualMachine, //整机台数完成率% 没有就传0
      VrAmountCompletionRate: data.AnnualService == undefined ? 0 : data.AnnualService, //服务金额完成率 % 没有就传 0
      VrProjectNumber: data.InHandMachine == undefined ? 0 : data.InHandMachine, //整机在手项目台数   没有就传 0
      VrProjectAmount: data.InHandService == undefined ? 0 : data.InHandService, //服务在手项目金额KRMB  没有就传 0
      VrIsMatching: Matchings[Matching] == undefined ? "" : Matchings[Matching], //是否配套：是 / 否
      VrMatchingBrand: data.SupportingBrands == undefined ? "" : data.SupportingBrands, //配套品牌
      VrMatchingNumber: data.SupportingScale == undefined ? "" : data.SupportingScale, //配套规模：年度需求空压机台数（品牌不限）
      VrBrandOpportunity: Opportunitys[Opportunity] == undefined ? "" : Opportunitys[Opportunity], //LIUTECH品牌的机会
      VrIndustry: HideOthers == 4 ? data.DesignOpportunity : HideOthers == 3 ? data.MiddlemanOpportunity : "", //主要针对行业
      VrCompeteBrand: HideOthers == 4 ? data.DesignCompetitive : HideOthers == 3 ? data.MiddlemanCompetitive : "", //主要竞争品牌
      VrPastNum: data.SaleNumber == undefined ? "" : data.SaleNumber, //过去三年平均空压机年销台数
    }
    let openid = wx.getStorageSync('openid')
    $common.request($api.PutVisitingRecordInfo, {
      OpenId: openid,
      VisiEntity: VisiEntity,
    }).then(res => {
      $common.hide()
      if (res.data.res) {
        $common.showToast('提交成功')
        let {
          id,
          Name
        } = this.data
        wx.navigateBack({
          delta: 1
        })
      } else {
        if (res.data.errType == 4) {
          $common.showToast(res.data.msg)
        } else if (res.data.errType == 1) {
          $common.showToast('参数错误')
        } else if (res.data.errType == -1) {
          $common.showToast('用户不存在')
        } else {
          $common.showToast('上传失败')
        }
      }
    })
  },
  Location() { //获取当前位置
    let self = this
    if (!self.data.openSetting) {
      wx.openSetting({
        success(res) {
          console.log(res)
          self.setData({
            openSetting: true
          })
        },
        fail(res) {
          console.log("授权失败")
        }
      })
    } else {
      $common.getLocation()
        .then(res => $common.reverseGeocoder(res))
        .then(res => {
          self.setData({
            Location: res.result.address
          })
        })
        .catch(res => {
          self.setData({
            openSetting: false
          })
        })
    }

  },
  //返回
  return () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //查看拜访
  details() {
    $common.loading()
    $common.request($api.GetVisitingRecordInfo, {
      VrId: this.data.VrId
    }).then(res => {
      if (res.data.res) {
        let data = res.data.Entity
        let { Division, division, visits, visit, objectives, objective, plans, plan, Results, Result, Matchings, Matching, Opportunitys, Opportunity}=this.data
        let VrCreateTime = $common.timeStamp(data.VrCreateTime).showTime;
        let VrVisitingDate = data.VrVisitingDate == null ? "" :$common.timeStamp(data.VrVisitingDate).showTime;
        let VrAirCompressorUsePurchase = ''
        if (data.VrAirCompressorUsePurchase != null) {
          VrAirCompressorUsePurchase = $common.timeStamp(data.VrAirCompressorUsePurchase).showTime;
        } else {
          VrAirCompressorUsePurchase = ''
        }
        for (let i = 0, len = objectives.length; i < len; i++) {
          if (objectives[i] === data.VrObjective) {
            objective = i
          }
        }
        for (let i = 0, len = Division.length; i < len; i++) {
          if (Division[i] === data.VrDivision) {
            division = i
          }
        }
        for (let i = 0, len = visits.length; i < len; i++) {
          if (visits[i] === data.VrCategory) {
            visit = i
          }
        }
        for (let i = 0, len = plans.length; i < len; i++) {
          if (plans[i] === data.VrVisitPlan) {
            plan = i
          }
        }
        for (let i = 0, len = Results.length; i < len; i++) {
          if (Results[i] === data.VrVisitingResults) {
            Result = i
          }
        }
        for (let i = 0, len = Matchings.length; i < len; i++) {
          if (Matchings[i] === data.VrIsMatching) {
            Matching = i
          }
        }
        for (let i = 0, len = Opportunitys.length; i < len; i++) {
          if (Opportunitys[i] === data.VrBrandOpportunity) {
            Opportunity = i
          }
        }
        let HideOthers = ""
        switch (data.VrCategory) {
          case "直销终端客户":
          case "代理商/经销商的终端客户":
            HideOthers = 0;
            break;
          case "直销OEM客户":
          case "代理商/经销商的OEM客户":
            HideOthers = 1;
            break;
          case "拜访代理商/经销商":
            HideOthers = 2;
            break;
          case "中间商":
          case "工程公司":
            HideOthers = 3;
            break;
          case "设计院":
            HideOthers = 4;
            break;
        }
        let imageList = data.VrPhoto.split('|')
        let VideoList = data.VrVideo.split('|')
        if (VideoList[0] == "") {
          VideoList = []
        }
        if (imageList[0] == "") {
          imageList = []
        }
        
        this.setData({
          listData: res.data.Entity,
          InnerTime: VrVisitingDate,
          VrVisitingDate,
          imageList,
          VideoList,
          CompressorUsePurchase:VrAirCompressorUsePurchase,
          division,
          visit,
          objective,
          plan,
          Result,
          Matching,
          Opportunity,
          Location: data.VrLocation,
          HideOthers
        })
      }
    }).then($common.hide())
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let Use = JSON.parse(options.Use)
    let edit = JSON.parse(options.edit)
    this.setData({
      Use: Use,
      VrId: options.VrId,
      id: options.id,
      Name: options.name,
      edit, 
    })
    if (edit) {
      this.details()
      if (Use) {
        wx.setNavigationBarTitle({
          title: '查看拜访'
        })
      } else {
        wx.setNavigationBarTitle({
          title: '编辑拜访'
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})