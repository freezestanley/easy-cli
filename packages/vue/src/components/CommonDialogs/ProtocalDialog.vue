<template>
  <el-dialog
    title
    :visible.sync="visible"
    :append-to-body="true"
    :before-close="close"
    top="80px"
    width="1000px"
  >
    <div
      class="agreement"
      :style="{height: calcHeight, 'font-family':'宋体', 'line-height': '150%', padding: '20px' }"
    >
      <p style="text-align:center">
        <strong>
          <span style="font-size: 20px">
            <span style="font-family:宋体">会员注册协议</span>
          </span>
        </strong>
      </p>
      <p style="text-align:center">
        <span style="font-size: 14px">&nbsp;</span>
      </p>
      <p style="text-align:center">
        <strong>
          <span style="font-size: 14px">
            <span style="font-family:宋体">重要提示</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          “众企安链平台”网站（
          <a href="http://www.zhongan-cc.com" target="_blank">www.zhongan-cc.com</a>，以下简称“平台”或“本网站”）由上海众安科技有限公司(以下简称“众企安链”或“本公司”)运营管理，并根据本协议的规定向平台会员提供服务。本协议双方为平台会员与本公司，适用于会员注册使用本网站服务的全部活动。在注册本网站之前，请会员务必认真阅读并充分理解本协议全部内容。
        </span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">会员选择</span>“我已阅读、理解并同意《会员注册协议》”并点击“实名认证”按钮，并按照本网站注册程序成功注册为会员，即视为会员签署了本协议，本协议立即在会员与本公司之间产生合同法律效力，会员使用本网站服务的全部活动将受到本协议的约束并应承担相应的责任和义务。
          </span>
        </strong>
        <span style=";font-size:14px">
          <span style="font-family:宋体">本协议条款将持续有效，有效期至会员注销或者被关闭账户。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style="font-weight:bold;font-size:14px">一、</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">释义</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">除本协议另有约定外，本协议中下列有关用语具有如下含义：</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>1）平台：指由上海众安科技有限公司投资并运营的提供融资中介服务的专业性网站，即平台网站（网址：
          <a href="http://www.suiyin-cc.com" target="_blank">www.suiyin-cc.com</a>）。
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>2）会员：指接受并同意本协议及平台的业务规则，通过平台进行交易的平台企业注册会员。
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>3）交易：会员通过平台与其他会员达成交易意向并进行交易的活动。
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">二、协议组成说明</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >2.1 本协议的内容包括本协议以下全部条款以及本网站已经公示发布的及将来可能公示发布的各项规则，该等规则均为本协议不可分割的一部分，与本协议以下所列条款具有同等法律效力。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >2.2 本网站有权根据需要修改本协议的内容。如本协议条款或本网站各项规则有任何变更，本网站将在网站上刊载公告，不再向会员作个别通知。请会员及时关注本网站关于相关条款和规则的公告，如不同意该变更，请在变更公告刊载之日起 24 小时内以在本网站注册时提供的邮箱向本网站公布的服务邮箱发送邮件或拨打客服电话表明希望终止本协议（“注册终止申请”），本平台确认收到注册终止申请后将与会员协商本协议终止后双方义务的履行。</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >如会员在本条所述时限内未发送注册终止申请，则本条所述时限届满之时，视为会员已经同意接受该等变更，并应遵照修改后的协议履行应尽义务。经修订的相关条款和规则一经公告，即于公告规定的特定生效日期自动生效并对会员产生法律约束力。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >2.3 本协议不涉及会员与本网站的其他会员之间因网上交易而产生的法律关系及法律纠纷。但会员在此不可撤销地同意，会员将全面接受并履行与本网站其他会员在本网站签订的任何电子法律文本，并承诺按照该法律文本享有和（或）放弃相应的权利、承担和（或）豁免相应的义务。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">三、服务简介</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">3.1 平台通过</span>
        <a href="http://www.suiyin-cc.com" target="_blank">www.suiyin-cc.com（日后变更首页域名的，以变更后的为准）</a>
        <span style=";font-size:14px">为会员提供网络交易平台服务，为改善会员体验或经营需要，会员服务的项目和内容可能会不时调整。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >3.2 平台搭建的是基于互联网的供应链金融服务平台，旨在为资金需求方会员和投资方会员提供融资需求对接服务，帮助有资金需求的会员获得更低成本的资金，同时，提高闲置资金的投资收益。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">3.3 平台向会员提供以下服务中的一项或多项：</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>1）撮合会员之间进行融资的居间服务；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>2）债权凭证的确认与存储；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>3）既有债权的转让；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>4）信用咨询及融资管理服务;
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>5）其他相关服务。
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">平台向会员提供服务的具体内容由相关方之间另行签署的协议约定。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >3.4 会员在平台注册成功后，可通过平台在合作银行开立现金管理结算账户或绑定自有账户进行相关资金操作，通过平台开立现金管理结算账户的，平台对会员的</span>
        <span style=";font-size:14px">
          <strong style="font-family:宋体">账户信息严格保密。</strong>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >3.5 平台向会员提供电子合同的签署、查看、存证、核验、下载等服务，如对电子合同真伪或电子合同的内容有任何疑问，会员可通过使用平台的查阅合同功能进行核对。除有相反证据证明外，平台系统所记录并在平台网页上显示的数据和信息是确定交易具体内容的依据。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">3.6</span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >为更好地为会员提供会员服务，平台可能会委托相关合作方为会员提供一部分会员服务而无须经过会员的同意或特别告知会员。对此，会员完全理解并予以同意。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >3.7 会员应自行准备上网设备，包括但不限于计算机、调制解调器或其他必备的上网装置，并自行承担上网开支，包括但不限于网络接入费、手机流量费等费用。</span>
      </p>
      <p style="line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style="font-family:宋体">四、会员管理</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >4.1 平台只接受在中国（不包括香港特区、澳门特区及台湾地区）注册成立，且有权订立具有法律约束力协议的企业法人或其他经济组织成为平台会员。</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >如不具备上述资格，应立即停止在本网站的注册程序、停止使用本网站服务，若违反前述规定注册使用本网站服务，本网站有权随时终止会员的注册进程及本网站服务，并保留终止会员资格、追究法律责任的权利。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >4.2 会员申请成为平台会员时，应自行向平台提供真实、准确、完整、合法有效的注册资料；当会员的注册资料发生变动时，应及时进行更新。如果涉及会员名称、营业执照注册号、组织机构代码证编号、税务登记证编号、开户许可证编号、法定代表人姓名及其身份证号码等信息变动的，须经平台审核后生效。会员应保证诸如电子邮件地址、联系电话、联系地址、邮政编码等内容的有效性及安全性。一旦平台向会员注册资料中提供的地址发送通知即视为已向该会员送达。</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >如果会员提供的注册资料不合法、不真实、不准确、不详尽，会员须承担因此引起的相应责任及后果，并且平台有权注销会员的账户，终止会员使用会员服务的权利。</span>
          </span>
        </strong>
        <span style=";font-size:14px">&nbsp;</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >4.3 在成功注册成为平台会员后，会员即获得其独享的专用账户（以下简称“会员账户”），会员账户是会员登陆平台的唯一账户。登录平台时会员应当使用会员账户和会员设定并保管的密码或者平台允许的方式进行登录；</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">会员应妥善保管会员的账户密码，因密码保管不善而造成的经济损失由会员自行承担</span>
          </span>
        </strong>
        <span style=";font-size:14px">
          <span style="font-family:宋体">；为保护会员的权益，会员在设定会员账户密码时，请使用符合平台要求的密码策略。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">4.4 会员注册成功后，不得将平台的用户名转让给第三方或者授权给第三方使用。</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >会员使用其自身的用户名和密码登录平台后在平台的一切行为均代表该会员并由该会员承担相应的法律后果。平台对会员的用户名和密码的遗失或被盗所产生的后果不承担任何责任</span>
          </span>
        </strong>
        <span style=";font-size:14px">
          <span style="font-family:宋体">。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">4.5 会员同意并认可平台可以通过邮件、短信、电话、系统消息等形式，向会员发送告知信息。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">五、平台使用规则</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">5.1</span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >会员通过在平台上输入其注册的用户名以及设定的密码，并依照平台相关业务规则所规定的流程，以中国金融认证中心颁发的与平台绑定的数字证书在平台上通过点击确认或类似方式签署数据电文，会员通过前述方式订立的电子合同对合同各方具有法律约束力。会员一旦向平台发出指令，便不得撤回或撤销，且成为平台向会员提供有关交易服务的唯一指令。</span>
          </span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">&nbsp;</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">5.2 会员可以将其持有的债权在平台进行流转，具体内容另见相关业务规则。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >5.3 平台与银行等金融机构合作为会员提供相关服务，但是，平台本身并不是银行等金融机构，平台向会员提供的交易服务也非金融业务，本协议项下的资金结算均通过银行系统来实现，会员理解并同意其资金在银行体系间流转需要合理时间。</span>
      </p>
      <p style="line-height:150%">
        <span style=";font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span style=";font-size:14px">5.4</span>
        <span style=";font-size:14px">
          <span
            style="font-family:宋体"
          >在会员注册成为平台用户时，会员授权平台可通过向银行或其他第三方机构收集会员相关资料，以核实会员身份、资产、信用等方面的真实状况。如遇特殊情况或政府机关、第三方机构需要提供纸质资料，平台有权向会员收集相关纸质资料，会员无条件给予配合和按照要求提供。</span>
        </span>
        <span style=";font-size:14px">&nbsp;</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">5.5</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">若会员未遵从本协议或相关业务规则，则平台有权拒绝为会员提供相关服务，会员对由此产生的损害自行承担责任。</span>
          </span>
        </strong>
        <span style=";font-size:14px">
          <span
            style="font-family:宋体"
          >若发生上述状况，而相关款项已先行划付至会员的现金管理结算账户名下，会员同意由平台向合作银行发出指令直接扣回相关款项或限制会员提取和使用此笔款项。若此笔款项已汇入会员指定的银行账户，则平台有向会员事后索回之权利；因会员的原因导致平台事后追索的会员应当承担合理的追索费用。</span>
        </span>
        <span style=";font-size:14px">&nbsp;</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >5.6 会员应了解并认可，任何通过本平台进行的交易并不能避免以下风险的产生，本平台不能也没有义务为如下风险负责：</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>1）宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，会员有可能遭受损失；
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>2）政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，会员有可能遭受损失；
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>3）违约风险：因其他交易方无力或无意愿按时足额履约，会员有可能遭受损失；
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>4） 利率风险：市场利率变化可能对购买或持有产品的实际收益产生影响；
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>5）平台技术风险：因平台系统短期内出现的故障、无法使用、错误信息等情况而导致会员短期内无法正常使用平台服务而造成的损失；
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>6）不可抗力因素导致的风险；
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">（</span>7）因会员的过错导致的任何损失，该过错包括但不限于：操作不当、遗忘或泄露密码、密码被他人破解、会员使用的计算机系统被第三方侵入、会员委托他人代理交易时他人恶意或不当操作而造成的损失。
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">5.7</span>
        </strong>
        <span style=";font-size:14px">&nbsp;</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >如平台发生了因系统故障或其他任何原因导致的处理错误，平台有权纠正该错误。如该错误导致会员实际收到的款项多于应获得的金额，则无论错误的性质和原因为何，平台保留纠正不当执行交易的权利，会员应根据平台向会员发出的有关纠正错误通知的具体要求返还多收的款项或进行其他操作。会员理解并同意，会员因前述处理错误而多付或少付的款项均不计利息。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">5.8 &nbsp;平台所涉及到的任何款项只以人民币计结，平台不提供任何形式的汇兑业务。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >5.10 会员不得利用本平台或本平台服务从事任何不符合中国法律法规或侵犯他人权益的活动，不得自行发布、转载、传送含有下列内容之一的信息，本台在发现会员从事该等活动和发布信息时，有权基于本平台的独立判断直接删除会员在本平台上作出的相关信息，有权不经通知而立即停止会员对本平台的全部或部分功能的使用（包括但不限于中止、终止、限制会员使用本网站服务）而无需通知会员，亦无需承担任何责任。如因此而给本平台造成损失的，应当赔偿本平台的损失。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>1）违反宪法确定的基本原则；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>2）危害国家安全，泄露国家机密，颠覆国家政权，破坏国家统一的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>3）损害国家荣誉和利益的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>4）煽动民族仇恨、民族歧视，破坏民族团结的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>5）破坏国家宗教政策，宣扬邪教和封建迷信的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>6）散布谣言，扰乱社会秩序，破坏社会稳定的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>8）侮辱或者诽谤他人，侵害他人合法权益的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>10）以非法民间组织名义活动的；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>11）含有法律、行政法规禁止的其他内容
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">六、服务费用</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >6.1 在会员接受平台提供的服务时，平台有权向会员收取相关服务费用，平台拥有制定及调整服务费用的权利。具体服务费用以会员使用平台提供的交易服务时，平台上所列收费方式公告或会员与平台达成的其他书面协议为准。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >6.2 会员在使用平台服务过程中可能需要向第三方（如保理公司或银行等）支付一定的费用，具体收费标准以会员使用平台提供的交易服务时，平台上所列收费方式公告或会员与第三方达成的其他书面协议为准。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">6.3</span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span
              style="font-family:宋体"
            >除非另有说明或约定，会员同意平台从会员授权平台管理的现金管理结算账户中直接扣收上述服务费用和第三方收费，实际扣收金额以会员确认的相关的业务单据为准。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">七、平台的服务限制</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >7.1 平台可随时根据战略规划或市场行情中断一项或多项服务，除法律另有规定外，平台无义务对任何个人或第三方负责。若会员对本协议条款或对本协议条款修改有疑问，或对平台的服务不满意，会员可以不再使用平台会员服务。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >7.2 平台有权基于单方判断（包含但不限于平台认为会员违反本协议的明文规定），暂停或终止向会员提供交易服务，并移除会员的资料或交易数据。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >7.3 在平台发现会员实施的交易异常，或平台对会员实施的交易有疑问，或平台认为会员实施的行为有违反法律法规规定、本协议及相关业务规则时，平台可对会员采取特殊限制措施（包括但不限于对会员名下未完成交易采取取消交易、调账、冻结、暂停交易服务等），并通过网站公告或系统消息的形式通知会员。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">八、会员账号注销</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >8.1 如会员需要注销其在平台注册的用户时，应首先结清会员通过平台办理的各项业务，会员选择通过平台在合作银行开立了现金管理结算账户的，还应确保相关现金管理结算账户余额为零，经平台审核同意后可正式注销会员账户。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >8.2 账户注销后，会员仍应对其使用平台提供的交易服务期间的行为承担可能的违约或损害赔偿责任，同时平台仍可保有会员的相关资料和交易数据。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">九、责任限制</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >9.1 基于互联网的特殊性，本公司无法保证本网站的服务不会中断，对于包括但不限于本公司、本网站及相关第三方的设备、系统存在缺陷，计算机发生故障、遭到病毒、黑客攻击或者发生地震、海啸等不可抗力而造成服务中断或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，平台会合理地尽力协助处理善后事宜，但平台不对因此导致的会员损失承担任何损害赔偿责任（包括但不限于利润、商誉、款项、使用、数据等方面的损失或其他无形损失）。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >9.2会员对于在本网站披露的信息、使用本网站提供的服务，参与本网站的交易等行为，应当自行判断信息真实性、交易安全性和承担相应的风险，由此而产生的法律责任由会员自己承担。本公司不承担任何责任。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">9.3</span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">与本公司合作的第三方机构向会员提供的服务由第三方机构自行负责，本公司不对此等服务产生的法律责任承担任何责任。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >9.4 本网站的内容可能涉及第三方所有的信息或第三方网站，该等信息或第三方网站的真实性、可靠性、有效性等由相关第三方负责，会员对该等信息或第三方网站应自行判断并承担相应的法律风险。该等第三方所有的信息或第三方网站的行为与本公司无关，本公司对此不承担任何责任。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span
            style="line-height: 150%;font-size: 14px"
          >9.5 无论如何，本公司对会员承担的违约赔偿或损害赔偿（如有）总额不超过向会员收取的服务费用总额。</span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">十、隐私权保护</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >10.1 平台可以根据会员在平台上的行为自动追踪相关会员的某些资料。在不违反法律法规和本协议的前提下，平台有权对整个会员数据库进行分析并对会员数据库进行商业上的合理利用，并可在平台的某些网页上使用诸如“Cookies”的资料收集装置。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >10.2会员选择“我已阅读、理解并同意《会员注册协议》”并点击“实名认证”按钮，则视为授权同意平台可以使用会员的相关资料，包括但不限于平台持有的会员档案资料，以及平台通过其他方式自行收集的资料，平台可通过人工或程序对会员的资料进行评价，平台的合作伙伴为提供本协议项下服务可对会员信息和资料进行查询、收集或进行信息数据分析。为确保会员信息的安全，平台及其合作伙伴将对上述信息负有保密义务，并采取各种措施保证信息安全。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">10.3 平台采用法律规定和行业标准惯例对会员的信息保密，平台不会恶意出售或免费共享给任何第三方，但以下情况除外：</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>1）向独立提供服务且仅要求提供服务相关必要信息的供应商，如印刷厂、邮递公司等提供会员的必要信息；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>2）向具有合法调阅信息权限并从合法渠道调阅信息的司法部门或其他政府机构提供会员信息；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>3）向平台的关联实体提供会员信息；
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span style="font-family:宋体">（</span>4）事前获得会员的明确授权。
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >10.4 经国家生效法律文书或行政处罚决定确认会员存在违法违规行为，或者平台有足够事实依据可以认定会员存在违法违规或违反本协议的行为，平台有权在平台上公布会员的违法违规、违约信息，并将有关行为记入与会员相关的信用资料和档案。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">十一、知识产权</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >11.1 众安供应链作为平台的运营商，拥有平台内容及资源的著作权等合法权利，受国家法律保护。除法律另有强制性规定外，未经平台明确的特别书面许可,任何单位不得以任何方式非法全部或部分复制、转载、引用、链接、抓取、衍生利用或以其他方式使用本站的信息内容，否则，平台有权追究其法律责任。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >11.2 平台所刊登的资料信息（诸如文本、图表、标识、设计、源代码、图像、声音文件片段、数字下载、数据编辑和软件），均是平台或其内容提供者的财产，受中国和国际版权公约的保护。平台上所有内容的汇编是平台的排他财产，受中国和国际版权公约的保护。平台上所有软件都是平台或其关联公司或其软件供应商的财产，受中国和国际版权公约的保护。未经平台书面同意，不得将平台包含的资料等任何内容镜像或者传送到任何其他网站或者服务器。任何未经授权对平台内容的使用均属于违法行为，平台将追究其法律责任。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">十二、通知</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">
          <span
            style="font-family:宋体"
          >本协议项下的通知如以公示方式作出，一经在平台公示即视为已经送达。除此之外，其他向会员发布的具有专属性的通知将由平台向会员通过系统消息、在注册时或者注册后变更用户信息时向平台提供的电子邮箱，或会员在注册后在平台绑定的手机发送，一经发送即视为已经送达。请会员密切关注平台的系统消息、会员的电子邮箱中的邮件和信息及手机中的短信信息。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">十三、适用法律及争议解决</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >13.1 本协议适用中华人民共和国法律。如本协议或网站规则条款中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其他条款的有效性和可执行性。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">13.2</span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">若会员和平台就本协议的订立和履行等事宜产生争议的，会员和平台应首先协商解决；协商不成，可向</span>
          </span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">中国</span>
          </span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">广州市</span>
          </span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">仲裁委员会申请仲裁</span>
          </span>
        </strong>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">。</span>
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">十四、其他</span> &nbsp;
          </span>
        </strong>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">14.1 本协议由本协议条款与平台的相关业务规则组成，本协议中未尽事宜应按照相关法律法规及平台的相关业务规则办理。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">14.2 本协议不涉及会员之间因网上交易而产生的法律关系及法律纠纷，平台不介入会员之间的交易纠纷，但可</span>
        <span style=";font-size:14px">
          <span style="font-family:宋体">协助会员查明交易情况。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">14.3</span>
        <strong>
          <span style="line-height: 150%;font-size: 14px">
            <span style="font-family:宋体">会员同意全面接受和履行与平台其他会员在平台签订的任何电子法律文本，并承诺按照该法律文本享有和</span>/或放弃相应的权利、承担和/或豁免相应的义务
          </span>
        </strong>
        <span style=";font-size:14px">
          <span style="font-family:宋体">。</span>
        </span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">14.4 如非特别指明，本协议条款均适用于平台所有注册会员。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span
          style=";font-size:14px"
        >14.5 本公司作为平台的运营服务提供商，有权代表平台对外签署协议，享有平台在本协议项下的权利并履行平台在本协议项下的义务。本公司对本协议拥有最终的解释权。</span>
      </p>
      <p style="text-indent:32px;line-height:150%">
        <span style=";font-size:14px">&nbsp;</span>
      </p>
      <br>
      <br>
      <br>
      <div>
        <p style="margin:0pt; orphans:0; text-align:center; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:15pt; font-weight:bold; letter-spacing:0.75pt"
          >会员隐私政策</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0;text-align:center">
          <span style="letter-spacing:0.75pt" />
          <span style="letter-spacing:0.75pt">发布时间：</span>
          <span style="letter-spacing:0.75pt">2019</span>
          <span style="letter-spacing:0.75pt">年</span>
          <span style="letter-spacing:0.75pt">7</span>
          <span style="letter-spacing:0.75pt">
            月
            1 日
          </span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span style="letter-spacing:0.75pt">上海众安科技有限公司（以下简称</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">我司</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >）深知会员信息对于您的重要性，会尽力保护会员的信息安全。我司致力于维护会员对于我司的信任，恪守以下原则保护会员的信息：权责一致原则、目的明确原则、选择同意原则、必要性原则、确保安全原则、公开透明原则等。同时，我司承诺依法采取相应的安全保护措施来保护会员的信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">本《会员隐私政策》将帮助您了解以下内容：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <ol type="1" style="margin:0pt; padding-left:0pt">
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">我司如何搜集和使用您的会员信息</span>
          </li>
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">我司如何使用</span>
            <span style="letter-spacing:0.75pt">Cookie</span>
            <span style="letter-spacing:0.75pt">和同类技术</span>
          </li>
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">我司如何共享、转让和公开披露您的会员信息</span>
          </li>
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">我司如何存储和保护您的会员信息</span>
          </li>
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">您控制会员信息的权利</span>
          </li>
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">本隐私政策如何更新</span>
          </li>
          <li
            style="color:#333333; font-size:14px; font-variant:normal; margin:0pt 0pt 0pt 40pt; orphans:0; padding-left:1pt; text-decoration:none; text-indent:0pt; text-transform:none; vertical-align:baseline; widows:0"
          >
            <span style="letter-spacing:0.75pt">如何联系我司</span>
          </li>
        </ol>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >一、我司如何收集和使用您的会员信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span style="letter-spacing:0.75pt">会员信息是指可能包含个人信息及相关企业信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="letter-spacing:0.75pt"
          >个人信息包括是以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。其中个人信息包括姓名、出生日期、身份证件号码、个人生物识别信息、通信通讯联系方式、住址、账户信息、财产状况、行踪轨迹等。其中一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的信息为个人敏感信息，主要包括：身份证件号码、个人生物识别信息、银行账号、征信信息、财产信息、交易信息、行踪轨迹、健康生理信息等。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="letter-spacing:0.75pt"
          >企业信息包括是以电子或其他方式记录的能够单独或者与其他信息结合识别特定企业身份或者反映特定企业活动情况的各种信息。企业信息包括企业名称、统一社会信用代码证号、法定代表人名称、法定代表人身份证号码、股东名称、股东身份证号码、企业经营范围、通信通讯联系方式、经营地址、账户信息、财产状况等。其中一旦泄露、非法提供或者滥用可能危害企业财产安全，极易导致企业名誉与财产安全受到损害或歧视性待遇等的信息为敏感信息，主要包括：法定代表人身份证件号码、法定代表人个人生物识别信息、企业银行账户信息、企业征信信息、企业财产信息、企业交易信息等。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（一）如何收集信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span style="letter-spacing:0.75pt">为向您提供服务并确保您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">安全，在您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">服务过程中，我司会收集您在使用服务过程中主动输入或因使用服务而产生的信息：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; text-indent: 30pt;orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">当您开通</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >服务时，依据法律法规及监管要求，我司会收集您的基本资料、身份信息、财产信息、通信信息、生物识别信息、手机号码、固定号码等信息，以帮助您完成</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">注册，如果您拒绝提供这些信息，您可能无法开通</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">服务或者无法正常使用我司的服务。</span>
        </p>
        <p style="margin:0pt 0pt 0pt 41pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; text-indent: 30pt;orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">功能或服务时，例如在下列情形中，您可能需要向我司提供或授权我司收集相应服务所需的会员信息。如您</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">拒绝提供部分功能或服务所需信息，您可能无法使用部分功能或服务，但这不影响您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">的其他功能或服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">1</span>
          <span style="letter-spacing:0.75pt">）为了让您更安全、快速地使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >服务，在需要短信验证码的环节，可能需要读取验证码短信内容协助您进行验证码填写。如您拒绝通讯信息（短信）授权，我司</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">将不读取短信内容，系统后台不保存短信内容。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">2</span>
          <span style="letter-spacing:0.75pt">）如您在</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >服务中通过选择声纹、刷脸功能进行实名认证时，需向我司提供您的声音、人脸图像信息。我司征得您的明示同意后采集的声纹信息、人脸信息，将加密存储于我司信息系统后台数据库中。如您不提供上述信息，我司将无法向您提供需完成声纹、人脸认证后方可使用的产品或服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">3</span>
          <span style="letter-spacing:0.75pt">）当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >的金融服务时，需向我司提供您所关联企业的企业名称、统一社会信用代码证号、法定代表人名称、法定代表人身份证号码、交易账户等信息，我司将以上信息加密存储于我司信息系统后台数据库中。如您不提供上述信息，我司将无法向您提供相应产品或服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">4</span>
          <span style="letter-spacing:0.75pt">）当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">提供的实名认证服务时，您需要提供您的详细用户信息，以便验证您的身份证的真实性，并可能通过银行卡号</span>
          <span style="letter-spacing:0.75pt">/</span>
          <span
            style="letter-spacing:0.75pt"
          >账号、密码等方式对有关信息进行有效性核验。如您不提供上述信息，我司将无法向您提供需完成实名认证后方可使用的产品或服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">5</span>
          <span style="letter-spacing:0.75pt">）当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >提供的搜索服务时，我司会收集您的搜索关键词信息。当搜索关键词信息无法单独识别您的会员信息时，该信息不属于您的会员信息，我司可以对其加以其他目的使用。当搜索关键词信息与您的其他信息结合可以识别您的会员身份时，我司将对搜索关键词信息作为您的会员信息加以保护处理。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">6</span>
          <span style="letter-spacing:0.75pt">）当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >服务时，我司会收集您的会员信息及交易信息，以便及时向您发送相关交易通知。我司可能会向我司的合作伙伴收集其合法留存并经您授权可以共享使用的信息，以便为您提供相应消息通知等服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span style="letter-spacing:0.75pt">（</span>
          <span style="letter-spacing:0.75pt">7</span>
          <span style="letter-spacing:0.75pt">）当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >提供的转账汇款、账号支付等收付款功能时，您需要提供收款方的账户信息，并可能需要提供您的会员信息，以便于验证身份及使用上述功能的支付服务。此外，我司还会收集您的相关收付款交易记录以便于您查询。上述信息属于个人及企业敏感信息，如您拒绝提供该信息，仅会使您无法使用上述功能，但不影响您正常使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">的其他功能。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">当您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >服务时，为了维护服务的正常运行，优化我司的服务体验及保障您的账号安全，我司会收集以下基础信息，包括您的设备型号、操作系统、登陆</span>
          <span style="letter-spacing:0.75pt">IP</span>
          <span
            style="letter-spacing:0.75pt"
          >地址、接入网络的方式、类型和状态、网络质量数据、操作日志等信息，这些信息是为您提供服务必须收集的基础信息，以保障您正常使用我司的服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span
            style="letter-spacing:0.75pt"
          >为向您提供更加准确、个性和便捷的服务，提升服务体验、改进服务质量，或为防范风险，我司会收集您反馈意见建议或举报时提供的信息，收集您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >功能或服务的类别、方式和操作信息，及您在我司的会员信息，我司会对这些信息进行统计、分析，并会根据上述信息向您提供相应服务或产品。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span style="letter-spacing:0.75pt">当您在</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >中使用第三方提供的服务时，第三方可能会获取您的部分会员信息。如您已明示同意该第三方可以获取的信息，我司将视为您允许第三方获取上述信息。对于您在使用该第三方服务时产生的信息，应由您与该第三方依法约定上述信息的收集和使用事项。如您拒绝第三方在提供服务时收集、使用或者传递上述信息，将可能会导致您无法在</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">中使用第三方的相应服务，但这不影响您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">的其他功能。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">6.</span>
          <span style="letter-spacing:0.75pt">当您在</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >使用服务时，为了向您提供更为安全、便捷的服务，我司可能会从第三方获取到您和您所关联企业的信用、工商、税务、交易等信息，用于确认您的身份以及为您提供个性化的服务。对于您在使用服务时主动提供给我司的相关信息，我司将视为您允许我司获取上述此类信息；对于您在使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">服务时产生的信息，应由您与我司依法约定上述信息的收集和使用事项。如您拒绝</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">在提供服务时收集、使用或者传递上述信息，将可能导致您无法在</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">中使用相应服务，但这不影响您使用</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">的其他功能。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（二）如何使用信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">在向您提供我司的金融产品或服务，并为改进这些产品或服务时使用。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span
            style="letter-spacing:0.75pt"
          >在我司向您提供金融服务期间，您授权我司持续收集和使用您的会员信息。在您注销服务时，我司将停止收集您相关的会员信息，但我司会在业务资料归档、审计、监管协查等领域继续使用此前收集的您的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span
            style="letter-spacing:0.75pt"
          >为提升您的产品或服务体验，或为防范风险，我司会对服务使用情况进行汇总、统计分析、加工，但这些信息不会包含您的任何身份识别信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span
            style="letter-spacing:0.75pt"
          >为了使您知悉我司金融产品或服务的情况或使您进一步了解我司服务，我司会向您发送服务状态通知以及相关产品或服务的商业性信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span style="letter-spacing:0.75pt">您授权同意的以及法律法规允许的其它用途。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（三）征得授权同意的例外</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">根据相关法律法规及国家标准，以下情形中，我司可能会收集、使用您的会员信息而无需另行征求您的授权同意：</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">与国家安全、国防安全直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">与公共安全、公共卫生、重大公共利益直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; text-indent: 30pt;orphans:0; widows:0;">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">与犯罪侦查、起诉、审判和判决执行等直接相关的;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span style="letter-spacing:0.75pt">出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您及时同意的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span style="letter-spacing:0.75pt">所收集的信息是您自行向社会公众公开的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">6.</span>
          <span style="letter-spacing:0.75pt">从合法公开披露的信息中收集的信息，如合法的新闻报道、政府信息公开等渠道；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">7.</span>
          <span style="letter-spacing:0.75pt">根据您要求签订和履行合同所必需的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">8.</span>
          <span style="letter-spacing:0.75pt">用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">9.</span>
          <span style="letter-spacing:0.75pt">为开展合法的新闻报道所必需的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; text-indent: 30pt;orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">10.</span>
          <span
            style="letter-spacing:0.75pt"
          >出于公共利益开展统计或学术研究所必需，且其对外提供学术研究或描述的结果时，对结果中所包含的会员信息进行去标识化处理的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; text-indent: 30pt;orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">11.</span>
          <span style="letter-spacing:0.75pt">法律法规规定的其他情形。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >二、我司如何使用</span>
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >Cookie</span>
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >和同类技术</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（一）</span>
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >Cookie</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">为确保网站正常运转，我司会在您的计算机或移动设备上存储名为</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">的小数据文件。</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">通常包含标识符、站点名称以及一些号码和字符。借助于</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">，网站能够存储您的偏好或历史行为等数据。我司不会将</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">用于本隐私政策所述目的之外的任何用途。您可根据自己的偏好管理或删除</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">，您可以清除计算机上保存的所有</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">，大部分网络浏览器都设有阻止</span>
          <span style="letter-spacing:0.75pt">Cookie</span>
          <span style="letter-spacing:0.75pt">的功能。但如果您这么做，则需要在每一次访问我司的网站时更改用户设置。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span style="letter-spacing:0.75pt">（二）</span>
          <span style="letter-spacing:0.75pt">
            Do
            Not Track
          </span>
          <span style="letter-spacing:0.75pt">（请勿追踪）</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">很多网络浏览器均设有</span>
          <span style="letter-spacing:0.75pt">
            Do
            Not Track
          </span>
          <span style="letter-spacing:0.75pt">功能，该功能可向网站发布</span>
          <span style="letter-spacing:0.75pt">
            Do
            Not Track
          </span>
          <span style="letter-spacing:0.75pt">请求。目前，主要互联网标准组织尚未设立相关政策来规定网站应如何应对此类请求。但如果您的浏览器启用了</span>
          <span style="letter-spacing:0.75pt">
            Do
            Not Track
          </span>
          <span style="letter-spacing:0.75pt">，那么我司的网站会尊重您的选择。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >三、我司如何共享、转让和公开披露您的会员信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（一）共享和转让</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">除非获得您的明确同意或授权，我司不会向其他任何公司、组织和个人共享或转让您的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span
            style="letter-spacing:0.75pt"
          >如业务需要对外共享或转让您的会员信息，我司会向您告知共享或转让会员信息的目的、数据接收方的身份，并征得您的授权同意。涉及敏感信息的，我司还会告知敏感信息的类型、数据接收方的身份和数据安全能力，并征得您的授权同意。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">请您理解，我司可能会根据法律法规规定或按照政府主管部门的强制性要求，对外共享您的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span
            style="letter-spacing:0.75pt"
          >根据法律法规和商业惯例，在合并、收购、资产转让等类似交易中，如涉及到会员信息转让，我司会要求新的持有您的会员信息的公司、组织继续受本隐私政策的约束，否则我司将要求该公司、组织重新向您征求授权同意。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（二）公开披露</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span
            style="letter-spacing:0.75pt"
          >我司不会公开披露您的会员信息，如确需披露，我司会告知您披露会员信息的目的、类型。如涉及敏感信息的还会告知敏感信息的内容，并事先征求您的授权同意。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">请您理解，在法律法规、法律程序、诉讼或政府主管部门强制性要求的情况下，我司可能会公开披露您的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（三）征得授权同意的例外</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span
            style="letter-spacing:0.75pt"
          >根据相关法律法规及国家标准，以下情形中，我司可能会共享、转让、公开披露您的会员信息而无需另行征求您的授权同意：</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">与国家安全、国防安全直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">与公共安全、公共卫生、重大公共利益直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">与犯罪侦查、起诉、审判和判决执行等直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span style="letter-spacing:0.75pt">出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您及时同意的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span style="letter-spacing:0.75pt">所收集的信息是您自行向社会公众公开的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">6.</span>
          <span style="letter-spacing:0.75pt">从合法公开披露的信息中收集的信息，如合法的新闻报道、政府信息公开等渠道。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >四、我司如何存储和保护您的会员信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（一）存储</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span
            style="letter-spacing:0.75pt"
          >我司在中华人民共和国境内收集和产生的会员信息，将存储在中华人民共和国境内。但为处理跨境业务并在征得您的授权同意后，您的会员信息可能会被转移到境外。此种情况下，我司会采取有效措施保护您的会员信息安全，例如，在跨境数据转移之前事实数据去标识化等安全措施，或通过协议、核查等措施要求境外机构为您的会员信息保密。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">我司仅在法律法规要求的期限内，以及为实现本隐私政策声明的目的所必须的时限内保留您的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（二）保护</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span
            style="letter-spacing:0.75pt"
          >我司已使用符合业界标准的安全防护措施保护您提供的会员信息，防止数据遭到未经授权的访问、公开披露、使用、修改、损坏或丢失。我司会采取一切合理可行的措施，保护您的会员信息。例如：我司会使用加密技术确保数据的保密性；我司会使用受信赖的保护机制防止数据遭到恶意攻击；我司会部署访问控制机制，确保只有授权人员才可访问会员信息；我司会举办安全和隐私保护培训课程，加强员工对于保护会员信息重要性的认识。</span>
          <span style="letter-spacing:0.75pt" />
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">如我司提供的全部或部分</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >业务停止运营，我司相关产品或服务将通过公告等形式向您进行告知，同时停止相关产品或服务对您会员信息的收集等操作，保护您的会员信息安全。如因技术故障、网络攻击、自然灾害及事故、人为因素等各种原因造成全部或部分</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">业务中断，我司将采取应急处置和恢复措施予以应对，尽快恢复服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">我司会采取一切合理可行的措施，确保未收集无关的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span
            style="letter-spacing:0.75pt"
          >请您理解，由于技术水平局限以及可能存在的恶意攻击，有可能出现我司无法合理预见、防范、避免、控制的意外情况。互联网并非绝对安全的环境，请使用复杂密码，协助我司保证您的账号安全。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span
            style="letter-spacing:0.75pt"
          >如发生会员信息安全事件，我司将按照法律法规规定，及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，或采取合理、有效的方式发布公告。同时，我司还将依据规定上报会员信息事件处置情况。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >五、您控制会员信息的权利</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">按照法律法规规定，我司保障您对会员信息行使以下权利：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（一）访问、更正及更新您的会员信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">您有权通过</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">访问、更正及更新您的会员信息。您有责任及时更新您的会员信息。在您修改会员信息之前，我司会验证您的身份。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（二）删除您的会员信息</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt">在以下情形中，您可以向我司提出删除您的会员信息：</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt;widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">如果我司处理会员信息的行为违反法律法规；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt;widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">如果我司收集、使用您的会员信息，却未征求您的授权同意；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt;widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">如果我司处理会员信息的行为违反了与您的约定；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt;widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span style="letter-spacing:0.75pt">如果您不再使用我司的产品或服务，或您注销了账户；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt;widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span style="letter-spacing:0.75pt">如果我司不再为您提供产品或服务。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="letter-spacing:0.75pt"
          >如我司决定响应您的删除请求，我司还将同时通知我司获得您的会员信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权同意。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">当您从我司的服务中删除信息后，我司可能不会立即在备份系统中删除相应的信息，但会在备份更新时删除这些信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（三）会员注销账户</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">您可以根据</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">的提示注销会员账户。您注销账户的行为是不可逆的，一旦您注销</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span style="letter-spacing:0.75pt">账户，我司将不再收集您的会员信息，并将删除有关您的一切信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（四）约束信息系统自动决策</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="letter-spacing:0.75pt"
          >在某些业务功能中，我司可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我司做出解释，我司将提供适当的救济方式。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="letter-spacing:0.75pt" />
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >（五）响应您的上述请求</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="letter-spacing:0.75pt"
          >为保障您的会员信息安全，您可能需要提供书面请求，或以其他方式证明您的身份。我司可能将会先要求您验证身份，然后再处理您的请求。请您理解，对于某些无端重复、需要过多技术手段、给他人合法权益带来风险或者非常不切实际的请求，我司可能会予以拒绝。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">尽管有上述约定，但按照法律法规要求，如涉及以下情形，我司将可能无法响应您的请求：</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">1.</span>
          <span style="letter-spacing:0.75pt">与国家安全、国防安全直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">2.</span>
          <span style="letter-spacing:0.75pt">与公共安全、公共卫生、重大公共利益直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent: 30pt; widows:0">
          <span style="letter-spacing:0.75pt">3.</span>
          <span style="letter-spacing:0.75pt">与犯罪侦查、起诉、审判和判决执行等直接相关的；</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">4.</span>
          <span style="letter-spacing:0.75pt">有充分证据证明您存在主观恶意或者滥用权利的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">5.</span>
          <span style="letter-spacing:0.75pt">响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">6.</span>
          <span style="letter-spacing:0.75pt">涉及我司商业秘密的。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >六、本隐私政策如何更新</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="letter-spacing:0.75pt">根据法律法规规定及服务运营需要，我司将对本隐私政策不时地进行更新，更新后的内容会在</span>
          <span style="letter-spacing:0.75pt">“</span>
          <span style="letter-spacing:0.75pt">众企安链网站</span>
          <span style="letter-spacing:0.75pt">”</span>
          <span
            style="letter-spacing:0.75pt"
          >公布，公布即生效，并取代此前相关内容。您应不时关注相关公告、提示信息等内容。您知悉并确认，如您同意更新后的内容，应立即停止使用相应服务，并在注销会员，我司将停止收集您的会员信息。如您继续使用服务，即视为同意接受更新内容。</span>
        </p>
        <p style="margin:0pt; orphans:0; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >七、如何联系我司</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="background-color:#ffffff; color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >
            如您对本隐私政策有任何疑问、意见或建议，请向我司发送电子邮件进行沟通，邮箱地址：<a class="theme" href="mailto:office@suiyincc.com">office@suiyincc.com</a>。
          </span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span
            style="color:#333333; font-size:14px; font-weight:bold; letter-spacing:0.75pt"
          >&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="font-weight:bold; letter-spacing:0.75pt">请您在勾选</span>
          <span style="font-weight:bold; letter-spacing:0.75pt">“</span>
          <span style="font-weight:bold; letter-spacing:0.75pt">同意</span>
          <span style="font-weight:bold; letter-spacing:0.75pt">”</span>
          <span
            style="font-weight:bold; letter-spacing:0.75pt"
          >之前仔细阅读本隐私政策，确保对其内容特别是字体加黑内容的含义及相应的法律后果已全部知晓并充分理解。您勾选</span>
          <span style="font-weight:bold; letter-spacing:0.75pt">“</span>
          <span style="font-weight:bold; letter-spacing:0.75pt">同意</span>
          <span style="font-weight:bold; letter-spacing:0.75pt">”</span>
          <span
            style="font-weight:bold; letter-spacing:0.75pt"
          >并确认提交即视为您接受本隐私政策，我司将按照法律法规及本隐私政策合法使用和保护您的会员信息。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="color:#333333; font-size:14px; letter-spacing:0.75pt">&#xa0;</span>
        </p>
        <p style="margin:0pt; orphans:0; text-indent:30pt; widows:0">
          <span style="font-family:Calibri; font-size:10.5pt">&#xa0;</span>
        </p>
      </div>
    </div>
    <div slot="footer" class="dialog-footer tac">
      <el-button
        type="primary"
        :disabled="time > 0"
        @click="handleCheck()"
      >我已阅读并同意服务协议 {{ timeStr }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      calcHeight: (window.innerHeight - 300) + 'px',
      visible: false,
      timer: null,
      time: 10,
    }
  },
  computed: {
    timeStr() {
      return this.time > 0 ? `( ${this.time} )` : ''
    },
  },
  destroyed() {
    this.clearTimer()
  },
  methods: {
    open() {
      this.visible = true
      this.time = 10
      this.startTimer()
    },
    close() {
      this.visible = false
      this.clearTimer()
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.time >= 1) {
          this.time--
        } else {
          this.clearTimer()
        }
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    handleCheck() {
      this.$emit('submit')
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.agreement {
  max-height: calc(100vh - 170px);
  overflow: auto;
}
</style>
