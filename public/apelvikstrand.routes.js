/* apelvikstrand.routes.js
 * "Hitta receptionen" — animerad rutt-feature ovanpå en existerande mapboxgl-karta.
 * Implementation 1:1 enligt spec.
 * Förutsätter att window.sektion73Map och window.mapboxgl finns.
 */
(function () {
  "use strict";

  function sektion73Ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  sektion73Ready(function () {
    (function waitForMap() {
      if (window.sektion73Map && window.mapboxgl) {
        sektion73InitRouteFeature();
      } else {
        setTimeout(waitForMap, 50);
      }
    })();
  });

  function sektion73InitRouteFeature() {
    var sektion73Map = window.sektion73Map;
    var mapboxgl = window.mapboxgl;
    var sektion73Canvas = document.getElementById("sektion73MapCanvas");

    /* =========================
       Konfiguration (sektion 2 — Åsa-anpassade värden)
       Vi initierar INTE kartan här; den finns redan.
       Endast värden som behövs av route-feature deklareras.
       ========================= */
    // Kustpromenaden: faktisk polyline från Kungsbackas GIS (kba:fri_kustnaravandringsled_l)
    // 9 segment chainade V→Ö, ~4,95 km. Källa: karta.kungsbacka.se WFS-tjänst.
    var sektion73KustpromenadenCoords = [
      [12.091173,57.344024],[12.091258,57.343971],[12.091286,57.343913],[12.091332,57.343855],
      [12.091393,57.343779],[12.091458,57.343647],[12.091392,57.343510],[12.091312,57.343325],
      [12.091256,57.343128],[12.091302,57.342981],[12.091489,57.342796],[12.091629,57.342649],
      [12.091577,57.342505],[12.091908,57.342024],[12.091855,57.341840],[12.091854,57.341670],
      [12.091950,57.341510],[12.092118,57.341370],[12.092424,57.341184],[12.092710,57.341008],
      [12.092815,57.340924],[12.092936,57.340876],[12.093148,57.340769],[12.093353,57.340679],
      [12.093501,57.340615],[12.093741,57.340550],[12.093875,57.340564],[12.093975,57.340574],
      [12.094058,57.340618],[12.094163,57.340628],[12.094289,57.340649],[12.094322,57.340653],
      [12.094493,57.340719],[12.094567,57.340743],[12.094653,57.340772],[12.094717,57.340816],
      [12.094854,57.340858],[12.095007,57.340939],[12.095054,57.341000],[12.095213,57.341068],
      [12.095312,57.341168],[12.095378,57.341265],[12.095499,57.341350],[12.095490,57.341434],
      [12.095515,57.341492],[12.095533,57.341540],[12.095588,57.341626],[12.095589,57.341630],
      [12.095673,57.341710],[12.095844,57.341794],[12.095989,57.341857],[12.096086,57.341904],
      [12.096231,57.341965],[12.096387,57.342034],[12.096566,57.342096],[12.096777,57.342135],
      [12.097049,57.342242],[12.097266,57.342320],[12.097507,57.342369],[12.097646,57.342384],
      [12.097755,57.342433],[12.097935,57.342465],[12.098179,57.342534],[12.098423,57.342570],
      [12.098861,57.342520],[12.099228,57.342510],[12.099587,57.342518],[12.099821,57.342563],
      [12.100045,57.342546],[12.100192,57.342585],[12.100284,57.342514],[12.100416,57.342457],
      [12.100673,57.342309],[12.100833,57.342279],[12.101019,57.342262],[12.101185,57.342275],
      [12.101285,57.342251],[12.101525,57.342274],[12.101647,57.342288],[12.101868,57.342253],
      [12.102012,57.342244],[12.102007,57.342186],[12.102065,57.342174],[12.102212,57.342169],
      [12.102321,57.342165],[12.102421,57.342171],[12.102511,57.342196],[12.102631,57.342230],
      [12.102720,57.342244],[12.102742,57.342244],[12.102753,57.342244],[12.102793,57.342244],
      [12.102946,57.342246],[12.103263,57.342249],[12.103496,57.342251],[12.103829,57.342251],
      [12.104016,57.342261],[12.104158,57.342286],[12.104254,57.342313],[12.104553,57.342395],
      [12.104574,57.342401],[12.104734,57.342446],[12.105041,57.342531],[12.105246,57.342588],
      [12.105364,57.342621],[12.105432,57.342640],[12.105646,57.342700],[12.105801,57.342743],
      [12.105951,57.342785],[12.106268,57.342873],[12.106548,57.342953],[12.106863,57.343043],
      [12.107214,57.343142],[12.107421,57.343194],[12.107527,57.343211],[12.107594,57.343249],
      [12.107622,57.343316],[12.107604,57.343447],[12.107703,57.343580],[12.107683,57.343724],
      [12.107722,57.343843],[12.107743,57.343875],[12.108123,57.344281],[12.107965,57.344408],
      [12.107856,57.344555],[12.107760,57.344726],[12.107681,57.344908],[12.107836,57.345005],
      [12.107850,57.345015],[12.108054,57.345059],[12.108265,57.345136],[12.108478,57.345208],
      [12.108700,57.345287],[12.108967,57.345413],[12.109283,57.345523],[12.109574,57.345630],
      [12.109878,57.345727],[12.110143,57.345764],[12.110320,57.345852],[12.110597,57.345917],
      [12.110735,57.345950],[12.110759,57.345956],[12.110789,57.345963],[12.110841,57.345976],
      [12.110956,57.346003],[12.111006,57.346015],[12.111427,57.346100],[12.111629,57.346112],
      [12.111839,57.346121],[12.111980,57.346128],[12.111785,57.347378],[12.112716,57.347465],
      [12.113020,57.348264],[12.113909,57.348248],[12.114379,57.348346],[12.115109,57.348546],
      [12.115496,57.348674],[12.116073,57.348754],[12.116156,57.348721],[12.116198,57.348482],
      [12.116536,57.348180],[12.116348,57.348099],[12.116604,57.347934],[12.116895,57.347831],
      [12.117004,57.347849],[12.117227,57.347642],[12.117266,57.347546],[12.117271,57.347470],
      [12.117603,57.347431],[12.119231,57.346958],[12.119335,57.346950],[12.119454,57.346958],
      [12.119614,57.346930],[12.119723,57.346938],[12.119791,57.346987],[12.119865,57.346985],
      [12.119910,57.346962],[12.120066,57.346935],[12.120367,57.346966],[12.120747,57.346925],
      [12.121102,57.346917],[12.121253,57.346899],[12.121331,57.346863],[12.121405,57.346831],
      [12.121477,57.346802],[12.121559,57.346764],[12.121596,57.346746],[12.121650,57.346726],
      [12.121695,57.346708],[12.121726,57.346698],[12.121841,57.346650],[12.121868,57.346635],
      [12.121943,57.346595],[12.122076,57.346538],[12.122180,57.346469],[12.122266,57.346352],
      [12.122350,57.346190],[12.122427,57.346001],[12.122498,57.345818],[12.122674,57.345672],
      [12.122733,57.345558],[12.122770,57.345275],[12.122687,57.345140],[12.122735,57.344985],
      [12.122804,57.344835],[12.122824,57.344738],[12.122812,57.344673],[12.122932,57.344553],
      [12.123078,57.344398],[12.123235,57.344241],[12.123360,57.344084],[12.123429,57.344008],
      [12.123487,57.344022],[12.123527,57.343965],[12.123601,57.343892],[12.123672,57.343792],
      [12.123758,57.343681],[12.123822,57.343590],[12.123907,57.343471],[12.124095,57.343322],
      [12.124331,57.343179],[12.124623,57.343090],[12.124743,57.342914],[12.124836,57.342847],
      [12.124803,57.342792],[12.124831,57.342750],[12.124912,57.342675],[12.125089,57.342636],
      [12.125172,57.342614],[12.125246,57.342596],[12.125348,57.342535],[12.125430,57.342407],
      [12.125501,57.342344],[12.125564,57.342279],[12.125693,57.342247],[12.125949,57.342188],
      [12.125986,57.342176],[12.125989,57.342131],[12.126064,57.342098],[12.126136,57.342065],
      [12.126183,57.341990],[12.126195,57.341884],[12.126254,57.341803],[12.126318,57.341755],
      [12.126403,57.341690],[12.126488,57.341656],[12.126591,57.341626],[12.126649,57.341602],
      [12.126713,57.341562],[12.126784,57.341505],[12.126847,57.341486],[12.126916,57.341480],
      [12.126963,57.341453],[12.126990,57.341406],[12.127074,57.341333],[12.127247,57.341300],
      [12.127544,57.341227],[12.127681,57.341131],[12.129514,57.341460],[12.129857,57.341659],
      [12.130075,57.341718],[12.130401,57.341852],[12.130645,57.341937],[12.132030,57.343053],
      [12.132333,57.343316],[12.132574,57.343514],[12.132984,57.343829],[12.133184,57.343940],
      [12.133349,57.343886],[12.133663,57.343989],[12.134484,57.343515],[12.135381,57.343040],
      [12.136530,57.342432],[12.136986,57.342182],[12.137613,57.341877],[12.138004,57.341723],
      [12.138811,57.341425],[12.139013,57.341354],[12.139743,57.341091],[12.141660,57.340408],
      [12.143072,57.339891],[12.142874,57.339763],[12.142718,57.339774],[12.142622,57.339758],
      [12.142564,57.339710],[12.142529,57.339650],[12.142554,57.339579],[12.142617,57.339535]
    ];

    // Kattegattleden: faktisk polyline från Kungsbackas GIS (kba:fri_kattegattleden_l), Åsa-portionen
    // 514 punkter, ~8,2 km. Cykelled från SE Åsa upp mot norra Åsa.
    var sektion73KattegattCoords = [
      [12.156853,57.320282],[12.156802,57.320353],[12.156811,57.320393],[12.156924,57.320549],
      [12.156975,57.320632],[12.157011,57.320677],[12.157068,57.320715],[12.157149,57.320735],
      [12.157248,57.320744],[12.157686,57.320755],[12.157593,57.320829],[12.157515,57.320975],
      [12.157387,57.321193],[12.157252,57.321448],[12.157094,57.321718],[12.156950,57.322016],
      [12.156926,57.322066],[12.156907,57.322149],[12.156873,57.322502],[12.156893,57.322724],
      [12.156910,57.322769],[12.157027,57.322969],[12.157140,57.323251],[12.157130,57.323330],
      [12.157084,57.323428],[12.157061,57.323527],[12.157054,57.323729],[12.157001,57.323817],
      [12.156919,57.323877],[12.156786,57.323936],[12.156657,57.324028],[12.156575,57.324105],
      [12.156512,57.324184],[12.156489,57.324249],[12.156508,57.324306],[12.156566,57.324354],
      [12.156680,57.324421],[12.156736,57.324484],[12.156783,57.324591],[12.156746,57.324735],
      [12.156810,57.324861],[12.156937,57.324913],[12.157161,57.324920],[12.158116,57.324763],
      [12.158590,57.324692],[12.159080,57.324659],[12.159427,57.324659],[12.159842,57.324759],
      [12.160138,57.324886],[12.160359,57.325161],[12.160478,57.325261],[12.161249,57.325434],
      [12.161654,57.325388],[12.161925,57.325419],[12.162086,57.325492],[12.162205,57.325598],
      [12.162274,57.325881],[12.162419,57.326064],[12.162749,57.326246],[12.162923,57.326292],
      [12.163926,57.326487],[12.164087,57.326492],[12.164169,57.326517],[12.164434,57.326525],
      [12.164772,57.326638],[12.165016,57.326664],[12.165124,57.326662],[12.165231,57.326653],
      [12.165302,57.326651],[12.165353,57.326649],[12.165318,57.326702],[12.165310,57.326812],
      [12.165306,57.326821],[12.165299,57.326830],[12.165288,57.326838],[12.165264,57.326850],
      [12.165173,57.326891],[12.164815,57.327045],[12.164367,57.327236],[12.164050,57.327370],
      [12.163442,57.327632],[12.161499,57.328463],[12.161042,57.328661],[12.160631,57.328836],
      [12.159454,57.329343],[12.159207,57.329445],[12.158252,57.329854],[12.157492,57.330187],
      [12.156997,57.330432],[12.156616,57.330633],[12.156346,57.330782],[12.156169,57.330892],
      [12.156000,57.331001],[12.155828,57.331117],[12.155749,57.331165],[12.155681,57.331201],
      [12.155607,57.331234],[12.155522,57.331262],[12.155392,57.331299],[12.155191,57.331356],
      [12.155015,57.331406],[12.154844,57.331456],[12.154748,57.331492],[12.154656,57.331539],
      [12.154599,57.331582],[12.154581,57.331603],[12.154550,57.331644],[12.154530,57.331695],
      [12.154523,57.331734],[12.154525,57.331771],[12.154530,57.331794],[12.154574,57.331934],
      [12.154590,57.331978],[12.154592,57.332015],[12.154591,57.332053],[12.154573,57.332097],
      [12.154558,57.332129],[12.154482,57.332207],[12.154327,57.332363],[12.154299,57.332398],
      [12.154197,57.332514],[12.154044,57.332694],[12.153915,57.332847],[12.153828,57.332957],
      [12.153516,57.333413],[12.153299,57.333804],[12.153161,57.334078],[12.152998,57.334419],
      [12.152963,57.334488],[12.152889,57.334641],[12.152777,57.334857],[12.152636,57.335103],
      [12.152531,57.335256],[12.152395,57.335449],[12.152329,57.335541],[12.152178,57.335721],
      [12.152100,57.335810],[12.152042,57.335868],[12.151893,57.336017],[12.151745,57.336157],
      [12.151688,57.336209],[12.151619,57.336267],[12.151480,57.336381],[12.151378,57.336460],
      [12.151290,57.336530],[12.151060,57.336695],[12.150776,57.336887],[12.150587,57.337005],
      [12.150411,57.337107],[12.150231,57.337207],[12.149993,57.337330],[12.149947,57.337354],
      [12.149845,57.337403],[12.149611,57.337512],[12.149477,57.337573],[12.149043,57.337753],
      [12.148929,57.337799],[12.148794,57.337851],[12.148529,57.337950],[12.148130,57.338095],
      [12.147422,57.338350],[12.145197,57.339139],[12.145086,57.339179],[12.144602,57.339352],
      [12.143086,57.339892],[12.142798,57.339995],[12.142597,57.340070],[12.139843,57.341051],
      [12.139216,57.341275],[12.138913,57.341384],[12.138576,57.341507],[12.138031,57.341717],
      [12.137556,57.341919],[12.137010,57.342162],[12.136641,57.342345],[12.136540,57.342396],
      [12.136115,57.342624],[12.135605,57.342907],[12.135329,57.343057],[12.135178,57.343147],
      [12.134829,57.343334],[12.134175,57.343697],[12.133879,57.343855],[12.133669,57.343970],
      [12.133406,57.344117],[12.133164,57.344255],[12.132379,57.344718],[12.131716,57.345113],
      [12.131577,57.345198],[12.130485,57.345859],[12.129665,57.346356],[12.129359,57.346538],
      [12.128521,57.347045],[12.127790,57.347487],[12.127523,57.347646],[12.127189,57.347844],
      [12.127175,57.347850],[12.127149,57.347851],[12.127128,57.347850],[12.127109,57.347845],
      [12.126970,57.347781],[12.126843,57.347716],[12.126580,57.347855],[12.126357,57.347978],
      [12.126082,57.348130],[12.125929,57.348216],[12.125904,57.348228],[12.125827,57.348275],
      [12.125813,57.348287],[12.125803,57.348295],[12.125789,57.348305],[12.125711,57.348349],
      [12.125579,57.348419],[12.125279,57.348580],[12.125182,57.348632],[12.125149,57.348657],
      [12.124917,57.348789],[12.124777,57.348862],[12.124289,57.349130],[12.124247,57.349147],
      [12.124180,57.349174],[12.123914,57.349288],[12.123784,57.349339],[12.123689,57.349386],
      [12.123581,57.349447],[12.123403,57.349556],[12.123313,57.349617],[12.123252,57.349656],
      [12.123247,57.349663],[12.123247,57.349670],[12.123252,57.349684],[12.123250,57.349697],
      [12.123240,57.349713],[12.122988,57.349884],[12.122907,57.349941],[12.122878,57.349965],
      [12.122716,57.350116],[12.122510,57.350306],[12.122413,57.350405],[12.121981,57.350839],
      [12.121939,57.350883],[12.121857,57.350966],[12.121755,57.351044],[12.121603,57.351162],
      [12.121531,57.351236],[12.121324,57.351548],[12.121256,57.351656],[12.121221,57.351716],
      [12.121207,57.351744],[12.121369,57.351777],[12.121520,57.351804],[12.121520,57.351819],
      [12.121509,57.351837],[12.121495,57.351859],[12.121452,57.351930],[12.121329,57.352173],
      [12.121245,57.352329],[12.121228,57.352355],[12.121205,57.352387],[12.121135,57.352469],
      [12.120921,57.352694],[12.120875,57.352740],[12.120765,57.352869],[12.120679,57.353000],
      [12.120466,57.353321],[12.120350,57.353496],[12.120312,57.353555],[12.120286,57.353611],
      [12.120277,57.353653],[12.120280,57.353683],[12.120291,57.353722],[12.120306,57.353744],
      [12.120318,57.353771],[12.120319,57.353791],[12.120315,57.353822],[12.120310,57.353847],
      [12.120307,57.353859],[12.120269,57.353926],[12.120261,57.353941],[12.120179,57.354062],
      [12.120170,57.354079],[12.120132,57.354142],[12.120085,57.354224],[12.119918,57.354514],
      [12.119816,57.354687],[12.119754,57.354776],[12.119673,57.354881],[12.119451,57.355170],
      [12.119393,57.355242],[12.119238,57.355446],[12.119195,57.355500],[12.119191,57.355510],
      [12.119199,57.355537],[12.119209,57.355557],[12.119216,57.355568],[12.119201,57.355579],
      [12.119179,57.355596],[12.119137,57.355630],[12.119103,57.355660],[12.119080,57.355696],
      [12.119073,57.355764],[12.118945,57.355954],[12.118847,57.356086],[12.118737,57.356217],
      [12.118624,57.356324],[12.118592,57.356353],[12.118554,57.356387],[12.118521,57.356418],
      [12.118482,57.356464],[12.118271,57.356753],[12.118107,57.356988],[12.118000,57.357135],
      [12.117890,57.357271],[12.118116,57.357364],[12.118233,57.357400],[12.118358,57.357437],
      [12.118507,57.357475],[12.118609,57.357497],[12.118702,57.357514],[12.118848,57.357539],
      [12.119212,57.357603],[12.119425,57.357650],[12.119672,57.357709],[12.119784,57.357741],
      [12.119931,57.357784],[12.120048,57.357820],[12.120147,57.357853],[12.120480,57.357972],
      [12.120591,57.358011],[12.120748,57.358061],[12.120908,57.358108],[12.121108,57.358161],
      [12.121313,57.358209],[12.121514,57.358250],[12.121718,57.358286],[12.121926,57.358318],
      [12.122119,57.358342],[12.122314,57.358362],[12.122510,57.358378],[12.122691,57.358389],
      [12.122889,57.358397],[12.122915,57.358395],[12.122938,57.358392],[12.122961,57.358386],
      [12.123009,57.358369],[12.123040,57.358362],[12.123073,57.358361],[12.123133,57.358363],
      [12.123189,57.358364],[12.123216,57.358367],[12.123237,57.358371],[12.123313,57.358406],
      [12.123343,57.358414],[12.123370,57.358417],[12.123784,57.358434],[12.124199,57.358452],
      [12.124414,57.358467],[12.124627,57.358488],[12.124807,57.358510],[12.124968,57.358533],
      [12.125167,57.358568],[12.125242,57.358582],[12.125323,57.358599],[12.125470,57.358631],
      [12.125622,57.358668],[12.125779,57.358711],[12.125932,57.358757],[12.126061,57.358799],
      [12.126184,57.358842],[12.126286,57.358881],[12.126393,57.358923],[12.126497,57.358968],
      [12.126599,57.359014],[12.126668,57.359048],[12.126739,57.359083],[12.126806,57.359118],
      [12.127272,57.359378],[12.127299,57.359393],[12.127326,57.359408],[12.127763,57.359652],
      [12.127816,57.359690],[12.127851,57.359728],[12.127884,57.359753],[12.127949,57.359800],
      [12.128004,57.359832],[12.128115,57.359887],[12.128171,57.359922],[12.128472,57.360149],
      [12.128550,57.360218],[12.128628,57.360274],[12.128705,57.360320],[12.128883,57.360414],
      [12.128993,57.360468],[12.129119,57.360526],[12.129276,57.360592],[12.129425,57.360648],
      [12.129593,57.360705],[12.129751,57.360753],[12.129884,57.360790],[12.130019,57.360823],
      [12.130479,57.360927],[12.130631,57.360964],[12.130825,57.361016],[12.131014,57.361074],
      [12.131142,57.361116],[12.131267,57.361161],[12.131913,57.361399],[12.132559,57.361636],
      [12.132681,57.361683],[12.132788,57.361726],[12.132860,57.361757],[12.132937,57.361791],
      [12.133008,57.361823],[12.133549,57.362075],[12.134090,57.362328],[12.134141,57.362353],
      [12.134194,57.362380],[12.134320,57.362451],[12.134406,57.362494],[12.134470,57.362523],
      [12.134645,57.362595],[12.134785,57.362643],[12.134927,57.362689],[12.135072,57.362732],
      [12.135218,57.362774],[12.135367,57.362813],[12.135518,57.362850],[12.135671,57.362884],
      [12.135826,57.362916],[12.136045,57.362956],[12.136252,57.362989],[12.136928,57.363082],
      [12.137331,57.363136],[12.137734,57.363190],[12.138021,57.363234],[12.138098,57.363248],
      [12.138237,57.363276],[12.138414,57.363313],[12.138627,57.363364],[12.138836,57.363421],
      [12.138968,57.363460],[12.139674,57.363680],[12.139844,57.363737],[12.140019,57.363803],
      [12.140040,57.363807],[12.140059,57.363809],[12.140088,57.363808],[12.140122,57.363805],
      [12.140161,57.363807],[12.140197,57.363813],[12.140229,57.363824],[12.140309,57.363861],
      [12.140370,57.363890],[12.140382,57.363897],[12.140393,57.363907],[12.140400,57.363917],
      [12.140403,57.363929],[12.140402,57.363940],[12.140397,57.363951],[12.140388,57.363960],
      [12.140366,57.363978],[12.140327,57.364004],[12.140317,57.364017],[12.140314,57.364031],
      [12.140320,57.364045],[12.140331,57.364054],[12.140345,57.364063],[12.140419,57.364097],
      [12.140500,57.364125],[12.140558,57.364142],[12.140602,57.364152],[12.140648,57.364161],
      [12.140744,57.364177],[12.140807,57.364192],[12.141080,57.364280],[12.141193,57.364318],
      [12.141262,57.364345],[12.141327,57.364373],[12.141377,57.364398],[12.141437,57.364430],
      [12.141492,57.364465],[12.141543,57.364501],[12.141590,57.364539],[12.141625,57.364570],
      [12.141675,57.364622],[12.141690,57.364630],[12.141710,57.364636],[12.141730,57.364637],
      [12.141779,57.364627],[12.141839,57.364718],[12.141846,57.364759],[12.141836,57.364797],
      [12.141689,57.364873],[12.141550,57.364949],[12.141449,57.365017],[12.141293,57.365166],
      [12.141098,57.365366],[12.140932,57.365544],[12.140849,57.365655],[12.140800,57.365800],
      [12.140743,57.365996],[12.140706,57.366178],[12.140707,57.366349],[12.140754,57.366574],
      [12.140776,57.366763],[12.140810,57.366933],[12.140868,57.367058],[12.140982,57.367214],
      [12.141152,57.367425],[12.141250,57.367542],[12.141394,57.367677],[12.141534,57.367826],
      [12.141576,57.367893],[12.141597,57.367974],[12.141607,57.368041],[12.141569,57.368174],
      [12.141505,57.368282],[12.141388,57.368479],[12.141164,57.368790],[12.141024,57.368932],
      [12.140852,57.369089],[12.140547,57.369363],[12.140358,57.369532],[12.140196,57.369682],
      [12.139994,57.369813],[12.139728,57.369972]
    ];

    var sektion73Home          = { lngLat: sektion73KustpromenadenCoords[0] };
    var sektion73InitialCenter = { lngLat: [12.12324908570747, 57.34933574694057] };
    var sektion73StartZoom     = (window.innerWidth <= 768) ? 16.4 : 17.6;
    var sektion73Pitch         = 0;
    var sektion73Bearing       = 0;

    /* =========================
       Routes-config (sektion 3)
       ========================= */
    var sektion73Routes = [{
      id: "route_kustpromenaden",
      from: sektion73KustpromenadenCoords[0],
      to:   sektion73KustpromenadenCoords[sektion73KustpromenadenCoords.length - 1],
      coords: sektion73KustpromenadenCoords,
      chipLabel: "Promenader",
      cardTitle: "Kustpromenaden",
      cardSubtitle: "Promenadstig längs kusten",
      iconKey: "walk",
      profile: "walking",
      paceMps: 1.4,  // ~5 km/h promenadtempo
      rowLabel: "Gångväg",
      line: {
        color: "#F0A500",
        casingColor: "rgba(240,165,0,.18)",
        width: 4.5,
        casingWidth: 11,
        opacity: 1
      },
      anim: { durationMs: 5000, arriveDur: 1400 }
    }, {
      id: "route_kattegattleden",
      from: sektion73KattegattCoords[0],
      to:   sektion73KattegattCoords[sektion73KattegattCoords.length - 1],
      coords: sektion73KattegattCoords,
      chipLabel: "Cykelleder",
      cardTitle: "Kattegattleden",
      cardSubtitle: "Cykelled längs kusten",
      iconKey: "bike",
      profile: "cycling",
      paceMps: 4.2,  // ~15 km/h cykeltempo
      rowLabel: "Cykelväg",
      line: {
        color: "#336aea",
        casingColor: "rgba(51,106,234,.18)",
        width: 4.5,
        casingWidth: 11,
        opacity: 1
      },
      anim: { durationMs: 6000, arriveDur: 1400 }
    }];

    /* =========================
       Geo-helpers (sektion 4)
       ========================= */
    function sektion73Haversine(a, b) {
      var R = 6371e3;
      var toR = function (d) { return d * Math.PI / 180; };
      var dLat = toR(b[1] - a[1]);
      var dLng = toR(b[0] - a[0]);
      var s = Math.pow(Math.sin(dLat / 2), 2) +
              Math.cos(toR(a[1])) * Math.cos(toR(b[1])) * Math.pow(Math.sin(dLng / 2), 2);
      return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
    }

    function sektion73MeasureRoute(coords) {
      var d = [0];
      for (var i = 1; i < coords.length; i++) {
        d.push(d[i - 1] + sektion73Haversine(coords[i - 1], coords[i]));
      }
      return d;
    }

    function sektion73PointAt(coords, dists, m) {
      if (m <= 0) return coords[0];
      if (m >= dists[dists.length - 1]) return coords[coords.length - 1];
      for (var i = 1; i < dists.length; i++) {
        if (dists[i] >= m) {
          var seg = dists[i] - dists[i - 1];
          var t = seg > 0 ? (m - dists[i - 1]) / seg : 0;
          return [
            coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * t,
            coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * t
          ];
        }
      }
      return coords[coords.length - 1];
    }

    function sektion73SliceRoute(coords, dists, m) {
      var r = [];
      for (var i = 0; i < coords.length; i++) {
        if (dists[i] <= m) {
          r.push(coords[i]);
        } else {
          r.push(sektion73PointAt(coords, dists, m));
          break;
        }
      }
      return r;
    }

    // Custom easing: 15% slow start (cubic) → 55% linear → 30% slow end (cubic out)
    function sektion73RouteEase(t) {
      if (t < 0.15) { var s1 = t / 0.15; return 0.15 * (s1 * s1 * s1); }
      if (t < 0.70) { return 0.15 + (t - 0.15) * (0.70 / 0.55); }
      var s2 = (t - 0.70) / 0.30, inv = 1 - s2;
      return 0.85 + 0.15 * (1 - inv * inv * inv);
    }

    /* =========================
       Diverge-detektion (sektion 5)
       ========================= */
    function sektion73FindDivergeIndex(walkCoords, driveCoords, thresholdM) {
      var threshold = thresholdM || 30;

      function closestDist(pt) {
        var min = Infinity;
        for (var j = 0; j < driveCoords.length; j++) {
          var d = sektion73Haversine(pt, driveCoords[j]);
          if (d < min) min = d;
        }
        return min;
      }

      // Fas 1: hitta första punkt där rutterna är nära varandra
      var sharedStart = -1;
      for (var i = 0; i < walkCoords.length; i++) {
        if (closestDist(walkCoords[i]) <= threshold) { sharedStart = i; break; }
      }
      if (sharedStart === -1) return 0;

      // Fas 2: hitta sista punkten där de fortfarande är nära.
      // Kräv 3+ konsekutiva "långt borta"-punkter för att bekräfta verklig divergens.
      var lastClose = sharedStart;
      for (var k = sharedStart; k < walkCoords.length; k++) {
        if (closestDist(walkCoords[k]) <= threshold) {
          lastClose = k;
        } else {
          var farCount = 0;
          for (var n = k; n < Math.min(k + 3, walkCoords.length); n++) {
            if (closestDist(walkCoords[n]) > threshold) farCount++;
          }
          if (farCount >= 3) return lastClose;
        }
      }
      return walkCoords.length - 1;
    }

    function sektion73GetDrivingBranch(driveCoords, divergePoint, thresholdM) {
      var bestIdx = 0, bestDist = Infinity;
      for (var i = 0; i < driveCoords.length; i++) {
        var d = sektion73Haversine(divergePoint, driveCoords[i]);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      }
      // Prepend divergePoint för sömlös skarv mot gångrutten
      return [divergePoint].concat(driveCoords.slice(bestIdx));
    }

    /* =========================
       Formatering & Directions API (sektion 6)
       ========================= */
    function sektion73FormatDist(m) {
      return m >= 1000 ? (m / 1000).toFixed(1).replace(".", ",") + " km" : Math.round(m) + " m";
    }
    function sektion73FormatTime(sec) { return Math.ceil(sec / 60) + " min"; }

    function sektion73FetchRoute(from, to, profile) {
      var url = "https://api.mapbox.com/directions/v5/mapbox/" + (profile || "walking") + "/"
        + from[0] + "," + from[1] + ";" + to[0] + "," + to[1]
        + "?geometries=geojson&overview=full&access_token=" + mapboxgl.accessToken;
      return fetch(url).then(function (res) {
        if (!res.ok) throw new Error("Directions API " + res.status);
        return res.json();
      }).then(function (json) {
        if (!json.routes || !json.routes.length) throw new Error("Ingen rutt hittad");
        var r = json.routes[0];
        return { coords: r.geometry.coordinates, distanceM: r.distance, durationS: r.duration };
      });
    }

    /* =========================
       Pulserande head dot (sektion 7)
       ========================= */
    function sektion73CreateHeadDot(colorClass) {
      var el = document.createElement("div");
      el.className = "sektion73RouteHeadDot" + (colorClass ? " " + colorClass : "");
      return new mapboxgl.Marker({ element: el, anchor: "center" });
    }

    /* =========================
       Animationsmotor (sektion 8)
       ========================= */
    var sektion73RouteState = {};

    // Mobil-helpers: använd Mapbox `padding` för att skifta map-center upp
    // så markören (route-head) alltid är synlig ovanför kortet.
    function sektion73IsMobile() {
      return window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
    }

    function sektion73GetActiveCard() {
      return document.querySelector(".sektion73PromenadCard:not(.sektion73PromenadCardHidden)");
    }

    // Returnerar PaddingOptions för Mapbox med bottom = kortets höjd (på mobil)
    function sektion73GetCardPadding() {
      var base = { top: 0, bottom: 0, left: 0, right: 0 };
      if (!sektion73IsMobile()) return base;
      var card = sektion73GetActiveCard();
      if (!card) return base;
      var rect = card.getBoundingClientRect();
      // Bottom-padding = allt från kortets topp ner till skärmens botten + lite extra
      return {
        top: 0,
        bottom: (window.innerHeight - rect.top) + 20,
        left: 0,
        right: 0
      };
    }

    function sektion73GetMobilePadding(basePadding) {
      if (!sektion73IsMobile()) return basePadding;
      var card = sektion73GetActiveCard();
      var cardH = 220;
      if (card) cardH = card.getBoundingClientRect().height;
      return {
        top: 40,
        bottom: cardH + 40,
        left: 30,
        right: 30
      };
    }

    function sektion73AnimateRoute(routeCfg, routeData, onPhaseChange, drivingData) {
      var id = routeCfg.id;
      var coords = routeData.coords;
      var l = routeCfg.line;
      var a = routeCfg.anim || {};

      // Setup: avbryt eventuell pågående animation för samma id
      var state = sektion73RouteState[id];
      if (state) {
        if (state.rafId) cancelAnimationFrame(state.rafId);
        state.running = false;
        if (state.dot) state.dot.remove();
        if (state.drvDot) state.drvDot.remove();
      }
      state = sektion73RouteState[id] = { running: true };

      // Ta bort eventuella gamla lager
      ["sektion73_rlin_", "sektion73_rcas_", "sektion73_rlin_drv_", "sektion73_rcas_drv_"].forEach(function (p) {
        if (sektion73Map.getLayer(p + id)) sektion73Map.removeLayer(p + id);
      });
      if (sektion73Map.getSource("sektion73_rsrc_" + id)) sektion73Map.removeSource("sektion73_rsrc_" + id);
      if (sektion73Map.getSource("sektion73_rsrc_drv_" + id)) sektion73Map.removeSource("sektion73_rsrc_drv_" + id);

      var dists = sektion73MeasureRoute(coords);
      var totalDist = dists[dists.length - 1];

      var srcLine = "sektion73_rsrc_" + id;
      var layerCasing = "sektion73_rcas_" + id;
      var layerLine = "sektion73_rlin_" + id;

      // Walking GeoJSON-source — börjar med bara startpunkten
      sektion73Map.addSource(srcLine, {
        type: "geojson",
        data: { type: "Feature", geometry: { type: "LineString", coordinates: [coords[0]] } }
      });

      // Två linjer (casing UNDER main)
      sektion73Map.addLayer({
        id: layerCasing,
        type: "line",
        source: srcLine,
        paint: {
          "line-color": l.casingColor,
          "line-width": l.casingWidth,
          "line-opacity": 1
        },
        layout: { "line-cap": "round", "line-join": "round" }
      });
      sektion73Map.addLayer({
        id: layerLine,
        type: "line",
        source: srcLine,
        paint: {
          "line-color": l.color,
          "line-width": l.width,
          "line-opacity": l.opacity
        },
        layout: { "line-cap": "round", "line-join": "round" }
      });

      // Driving setup (lazy lager-skapande senare)
      var drvBranch = null, drvDists = null, drvTotalDist = 0, drvDivergeDistOnWalk = 0;
      var drv = routeCfg.driving;
      var srcDrv = "sektion73_rsrc_drv_" + id;
      var layerDrvCasing = "sektion73_rcas_drv_" + id;
      var layerDrvLine = "sektion73_rlin_drv_" + id;
      var drvLayersCreated = false;
      var drvDot = null;

      if (drv && drivingData) {
        var driveCoords = drivingData.coords;
        var divergeIdx = sektion73FindDivergeIndex(coords, driveCoords, drv.divergeThresholdM || 30);
        var divergePoint = coords[divergeIdx];
        drvBranch = sektion73GetDrivingBranch(driveCoords, divergePoint, drv.divergeThresholdM || 30);
        drvDists = sektion73MeasureRoute(drvBranch);
        drvTotalDist = drvDists[drvDists.length - 1];
        drvDivergeDistOnWalk = dists[divergeIdx];
      }

      // Walking head dot
      var dot = sektion73CreateHeadDot();
      dot.setLngLat(coords[0]).addTo(sektion73Map);
      state.dot = dot;

      // Fas 1: Overview
      if (typeof onPhaseChange === "function") onPhaseChange("overview");
      var lngs = coords.map(function (c) { return c[0]; });
      var lats = coords.map(function (c) { return c[1]; });
      var bounds = [
        [Math.min.apply(null, lngs), Math.min.apply(null, lats)],
        [Math.max.apply(null, lngs), Math.max.apply(null, lats)]
      ];
      sektion73Map.fitBounds(bounds, {
        padding: sektion73GetMobilePadding({ top: 80, bottom: 120, left: 60, right: 60 }),
        maxZoom: 15.8,
        pitch: 35,
        bearing: sektion73Bearing,
        duration: 1400,
        essential: true
      });

      // Fas 2: Linjeritning + kamerapan
      if (typeof onPhaseChange === "function") onPhaseChange("animating");
      var duration = a.durationMs || 6000;
      var zoomOutDur = 1400;
      var t0 = performance.now();

      function tick(now) {
        if (!state.running) return;
        var elapsed = now - t0;
        var rawT = Math.min(elapsed / duration, 1);
        var eased = sektion73RouteEase(rawT);
        var dist = eased * totalDist;

        // 1) Uppdatera walking-linjens GeoJSON med slice
        var slice = sektion73SliceRoute(coords, dists, dist);
        sektion73Map.getSource(srcLine).setData({
          type: "Feature",
          geometry: { type: "LineString", coordinates: slice }
        });

        // 2) Flytta walking head dot
        var head = slice[slice.length - 1];
        dot.setLngLat(head);

        // 3) Driving: lazy-skapa lager + dot vid första passage av diverge-punkten
        if (drvBranch && drvDists && dist >= drvDivergeDistOnWalk) {
          if (!drvLayersCreated) {
            drvLayersCreated = true;
            sektion73Map.addSource(srcDrv, {
              type: "geojson",
              data: { type: "Feature", geometry: { type: "LineString", coordinates: [drvBranch[0]] } }
            });
            sektion73Map.addLayer({
              id: layerDrvCasing,
              type: "line",
              source: srcDrv,
              paint: {
                "line-color": drv.line.casingColor,
                "line-width": drv.line.casingWidth,
                "line-opacity": 0,
                "line-opacity-transition": { duration: 500 }
              },
              layout: { "line-cap": "round", "line-join": "round" }
            });
            sektion73Map.addLayer({
              id: layerDrvLine,
              type: "line",
              source: srcDrv,
              paint: {
                "line-color": drv.line.color,
                "line-width": drv.line.width,
                "line-opacity": 0,
                "line-opacity-transition": { duration: 500 }
              },
              layout: { "line-cap": "round", "line-join": "round" }
            });
            if (drv.line.dasharray) {
              sektion73Map.setPaintProperty(layerDrvLine, "line-dasharray", drv.line.dasharray);
            }
            // Trigga fade-in nästa frame
            requestAnimationFrame(function () {
              sektion73Map.setPaintProperty(layerDrvCasing, "line-opacity", 1);
              sektion73Map.setPaintProperty(layerDrvLine, "line-opacity", drv.line.opacity || 1);
            });
            drvDot = sektion73CreateHeadDot("sektion73RouteHeadDotDrv");
            drvDot.setLngLat(drvBranch[0]).addTo(sektion73Map);
            state.drvDot = drvDot;
          }

          // Mappa kvarvarande walking-distans till bil-progress
          var drvElapsed = dist - drvDivergeDistOnWalk;
          var walkRemaining = totalDist - drvDivergeDistOnWalk;
          var drvProgress = walkRemaining > 0 ? Math.min(drvElapsed / walkRemaining, 1) : 1;
          var drvDist = drvProgress * drvTotalDist;
          var drvSlice = sektion73SliceRoute(drvBranch, drvDists, drvDist);
          sektion73Map.getSource(srcDrv).setData({
            type: "Feature",
            geometry: { type: "LineString", coordinates: drvSlice }
          });
          if (drvDot) drvDot.setLngLat(drvSlice[drvSlice.length - 1]);
        }

        // 4) Kamerapan — STARTAR efter overview-zoom är klar
        if (elapsed > zoomOutDur) {
          sektion73Map.easeTo({
            center: head,
            pitch: 35,
            duration: 300,
            padding: sektion73GetCardPadding(),
            easing: function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
          });
        }

        if (rawT < 1) {
          state.rafId = requestAnimationFrame(tick);
        } else {
          // Fas 3: Arrive
          state.running = false;
          if (typeof onPhaseChange === "function") onPhaseChange("arrived");

          // Stoppa eventuell in-flight kamera-easeTo från phase 2
          if (typeof sektion73Map.stop === "function") sektion73Map.stop();

          // Beräkna en predikterbar "arrive-view" — center på rutten + konservativ zoom
          var midLng = (bounds[0][0] + bounds[1][0]) / 2;
          var midLat = (bounds[0][1] + bounds[1][1]) / 2;
          var dLng = bounds[1][0] - bounds[0][0];
          var dLat = bounds[1][1] - bounds[0][1];
          var maxDeg = Math.max(dLng, dLat * 1.5);  // lat ~1.5x längre per grad vid 57°
          var arriveZoom;
          if (maxDeg > 0.06)      arriveZoom = 13.6;
          else if (maxDeg > 0.04) arriveZoom = 14;
          else if (maxDeg > 0.02) arriveZoom = 14.5;
          else                    arriveZoom = 15;
          if (sektion73IsMobile()) arriveZoom = Math.max(13.4, arriveZoom - 0.5);

          sektion73Map.easeTo({
            center: [midLng, midLat],
            zoom: arriveZoom,
            pitch: 35,
            bearing: sektion73Bearing,
            duration: a.arriveDur || 1400,
            padding: sektion73GetCardPadding(),
            easing: function (t) { return 1 - Math.pow(1 - t, 3); }
          });

          var dotEl = dot.getElement();
          if (dotEl) dotEl.classList.add("is-arrived");
          setTimeout(function () { if (dotEl) dotEl.style.opacity = "0"; }, 800);
          setTimeout(function () { dot.remove(); }, 1200);

          if (drvDot) {
            var drvDotEl = drvDot.getElement();
            if (drvDotEl) drvDotEl.classList.add("is-arrived");
            setTimeout(function () { if (drvDotEl) drvDotEl.style.opacity = "0"; }, 800);
            setTimeout(function () { drvDot.remove(); }, 1200);
          }

          // Rita ut hela bilrutten i sin helhet
          if (drvBranch && drvDists && sektion73Map.getSource(srcDrv)) {
            sektion73Map.getSource(srcDrv).setData({
              type: "Feature",
              geometry: { type: "LineString", coordinates: drvBranch }
            });
          }
        }
      }

      state.rafId = requestAnimationFrame(tick);
    }

    /* =========================
       Cleanup (sektion 9)
       ========================= */
    function sektion73ClearRoute(routeId) {
      var state = sektion73RouteState[routeId];
      if (state) {
        if (state.rafId) cancelAnimationFrame(state.rafId);
        state.running = false;
        if (state.dot) state.dot.remove();
        if (state.drvDot) state.drvDot.remove();
      }
      ["sektion73_rlin_", "sektion73_rcas_"].forEach(function (p) {
        if (sektion73Map.getLayer(p + routeId)) sektion73Map.removeLayer(p + routeId);
      });
      if (sektion73Map.getSource("sektion73_rsrc_" + routeId)) {
        sektion73Map.removeSource("sektion73_rsrc_" + routeId);
      }
      ["sektion73_rlin_drv_", "sektion73_rcas_drv_"].forEach(function (p) {
        if (sektion73Map.getLayer(p + routeId)) sektion73Map.removeLayer(p + routeId);
      });
      if (sektion73Map.getSource("sektion73_rsrc_drv_" + routeId)) {
        sektion73Map.removeSource("sektion73_rsrc_drv_" + routeId);
      }
    }

    /* =========================
       CSS-injektion (sektion 11)
       ========================= */
    function sektion73InjectRouteCSS() {
      if (document.getElementById("sektion73RouteCSSv2")) return;
      var s = document.createElement("style");
      s.id = "sektion73RouteCSSv2";
      s.textContent = [
        "/* Pulserande head dot (gång — orange) */",
        ".sektion73RouteHeadDot {",
        "  width: 14px; height: 14px;",
        "  border-radius: 50%;",
        "  background: #F0A500;",
        "  border: 2.5px solid #fff;",
        "  box-shadow: 0 0 0 0 rgba(240,165,0,.4), 0 1px 6px rgba(0,0,0,.25);",
        "  animation: sektion73DotPulse 2s ease-in-out infinite;",
        "  pointer-events: none;",
        "  transition: opacity .3s ease;",
        "}",
        ".sektion73RouteHeadDot.is-arrived { animation: sektion73DotArrive .4s ease forwards; }",
        "@keyframes sektion73DotPulse {",
        "  0%,100% { box-shadow: 0 0 0 0 rgba(240,165,0,.35), 0 1px 6px rgba(0,0,0,.25); }",
        "  50%     { box-shadow: 0 0 0 8px rgba(240,165,0,0),  0 1px 6px rgba(0,0,0,.25); }",
        "}",
        "@keyframes sektion73DotArrive {",
        "  0%   { transform: scale(1); }",
        "  50%  { transform: scale(1.4); }",
        "  100% { transform: scale(1); }",
        "}",
        "/* Head dot — bil (blå variant) */",
        ".sektion73RouteHeadDotDrv {",
        "  background: #336aea;",
        "  box-shadow: 0 0 0 0 rgba(51,106,234,.4), 0 1px 6px rgba(0,0,0,.25);",
        "  animation: sektion73DotPulseDrv 2s ease-in-out infinite;",
        "}",
        "@keyframes sektion73DotPulseDrv {",
        "  0%,100% { box-shadow: 0 0 0 0 rgba(51,106,234,.35), 0 1px 6px rgba(0,0,0,.25); }",
        "  50%     { box-shadow: 0 0 0 8px rgba(51,106,234,0),  0 1px 6px rgba(0,0,0,.25); }",
        "}",
        "/* Promenad-kort: glider upp där filter-railen var */",
        ".sektion73PromenadCard {",
        "  position: fixed;",
        "  left: 50%;",
        "  bottom: 20px;",
        "  transform: translateX(-50%) translateY(0);",
        "  opacity: 1;",
        "  z-index: 999;",
        "  width: min(340px, calc(100vw - 24px));",
        "  background: #fff;",
        "  border-radius: 16px;",
        "  box-shadow: 0 6px 30px rgba(0,0,0,.16), 0 0 0 1px rgba(0,0,0,.04);",
        "  transition:",
        "    transform var(--sektion73-modal-dur, 420ms) cubic-bezier(.2,.8,.2,1),",
        "    opacity 180ms ease;",
        "  will-change: transform, opacity;",
        "  pointer-events: auto;",
        "  overflow: hidden;",
        "  font-family: 'Inter','Manrope',system-ui,-apple-system,sans-serif;",
        "}",
        ".sektion73PromenadCard.sektion73PromenadCardHidden {",
        "  transform: translateX(-50%) translateY(86px);",
        "  opacity: 0;",
        "  pointer-events: none;",
        "}",
        ".sektion73PromenadCardHead {",
        "  display: flex; align-items: center; gap: 10px;",
        "  padding: 14px 16px 10px;",
        "}",
        ".sektion73PromenadCardHeadIco {",
        "  width: 36px; height: 36px;",
        "  border-radius: 999px;",
        "  background: #6E99AE;",
        "  color: #fff;",
        "  display: inline-flex; align-items: center; justify-content: center;",
        "  flex-shrink: 0;",
        "}",
        ".sektion73PromenadCardHeadIco svg { width: 20px; height: 20px; fill: currentColor; }",
        ".sektion73PromenadCardTitle {",
        "  font: 600 15px/1.2 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #1a1a1a;",
        "}",
        ".sektion73PromenadCardSub {",
        "  font: 500 12px/1.2 'Inter','Manrope',system-ui,sans-serif;",
        "  color: rgb(128,134,139); margin-top: 2px;",
        "}",
        ".sektion73PromenadCardRoutes { padding: 6px 16px 12px; display: flex; flex-direction: column; gap: 10px; }",
        ".sektion73PromenadCardRow    { display: flex; align-items: center; gap: 12px; }",
        ".sektion73PromenadCardDot {",
        "  width: 14px; height: 14px; border-radius: 50%;",
        "  flex-shrink: 0;",
        "  box-shadow: 0 0 0 3px rgba(0,0,0,.06);",
        "}",
        ".sektion73PromenadCardInfo { display: flex; flex-direction: column; gap: 1px; min-width: 0; }",
        ".sektion73PromenadCardType { font: 600 11px/1.2 'Inter','Manrope',system-ui,sans-serif; color: #80868b; letter-spacing: .02em; text-transform: uppercase; }",
        ".sektion73PromenadCardTime { font: 600 15px/1.2 'Inter','Manrope',system-ui,sans-serif; color: #1a1a1a; }",
        ".sektion73PromenadCardDist { font: 600 11.5px/1.2 'Inter','Manrope',system-ui,sans-serif; color: #80868b; margin-left: auto; white-space: nowrap; flex-shrink: 0; }",
        ".sektion73PromenadCardSep  { height: 1px; background: rgba(0,0,0,.06); margin: 0 16px; }",
        "/* Tillbaka-knapp */",
        ".sektion73PromenadCardBack {",
        "  display: flex; align-items: center; justify-content: center; gap: 4px;",
        "  padding: 12px 16px;",
        "  font: 600 13.5px/1 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #1a1a1a; cursor: pointer;",
        "  transition: background .15s ease;",
        "  width: 100%;",
        "  background: none; border: none;",
        "  border-radius: 0 0 16px 16px;",
        "  -webkit-appearance: none;",
        "}",
        ".sektion73PromenadCardBack:hover  { background: rgba(0,0,0,.04); }",
        ".sektion73PromenadCardBack:active { background: rgba(0,0,0,.07); }",
        ".sektion73PromenadCardBackIco svg { width: 18px; height: 18px; fill: currentColor; vertical-align: middle; margin-right: 2px; }",
        "/* Loading-shimmer på time-värden */",
        ".sektion73PromenadCardTime.is-loading,",
        ".sektion73PromenadCardDist.is-loading {",
        "  display: inline-block;",
        "  min-width: 60px;",
        "  height: 14px;",
        "  border-radius: 4px;",
        "  background: linear-gradient(90deg, #eee 25%, #f6f6f6 50%, #eee 75%);",
        "  background-size: 200% 100%;",
        "  animation: sektion73Shimmer 1.4s ease infinite;",
        "  color: transparent;",
        "}",
        ".sektion73PromenadCardDist.is-loading { min-width: 40px; }",
        "@keyframes sektion73Shimmer {",
        "  0%   { background-position: 200% 0; }",
        "  100% { background-position: -200% 0; }",
        "}",
        "/* Chip i railen — extra styling utöver .sektion73FilterBtn */",
        ".sektion73PromenadChip .sektion73FilterIco svg { width: 18px; height: 18px; }",
        "/* Filter-chips hover/active matchar led-items */",
        ".sektion73FilterBtn:hover  { background: rgba(0,0,0,.04); }",
        ".sektion73FilterBtn:active { background: rgba(0,0,0,.07); }",
        "/* Dölj alla pin-markörer när en route är aktiv */",
        "body.sektion73-route-active .sektion73PinWrap { display: none !important; }",
        "/* Led-lista (kategorimeny) */",
        ".sektion73LedList { padding: 4px 8px 8px; display: flex; flex-direction: column; gap: 2px; }",
        ".sektion73LedItem {",
        "  display: flex; align-items: center; gap: 12px;",
        "  padding: 10px 8px;",
        "  background: none; border: none;",
        "  border-radius: 10px;",
        "  cursor: pointer;",
        "  text-align: left;",
        "  width: 100%;",
        "  -webkit-appearance: none;",
        "  font-family: 'Inter','Manrope',system-ui,sans-serif;",
        "  transition: background .15s ease;",
        "}",
        ".sektion73LedItem:hover { background: rgba(0,0,0,.04); }",
        ".sektion73LedItem:active { background: rgba(0,0,0,.07); }",
        ".sektion73LedItemIco {",
        "  width: 36px; height: 36px;",
        "  border-radius: 50%;",
        "  background: rgba(0,0,0,.05);",
        "  display: inline-flex; align-items: center; justify-content: center;",
        "  flex-shrink: 0;",
        "}",
        ".sektion73LedItemIco svg { width: 20px; height: 20px; }",
        ".sektion73LedItemInfo { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }",
        ".sektion73LedItemTitle {",
        "  font: 600 14px/1.2 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #1a1a1a;",
        "}",
        ".sektion73LedItemMeta {",
        "  font: 500 12px/1.2 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #80868b;",
        "  margin-top: 2px;",
        "}",
        ".sektion73LedItemArrow {",
        "  color: #c0c4ca;",
        "  display: inline-flex; align-items: center; justify-content: center;",
        "  flex-shrink: 0;",
        "}",
        ".sektion73LedItemArrow svg { width: 22px; height: 22px; fill: currentColor; color: #80868b; }",
        "/* Cross-fade mellan list & detail */",
        ".sektion73LedListView, .sektion73LedDetailView { transition: opacity .25s ease; }",
        ".sektion73LedListView[hidden], .sektion73LedDetailView[hidden] { display: none; }",
        "/* Detail-vy: hero med led-färgad tint */",
        ".sektion73LedDetailHero {",
        "  --sektion73-route-color: #6E99AE;",
        "  display: flex; flex-direction: row; align-items: center; gap: 14px;",
        "  padding: 18px 18px 0px;",
        "  background: linear-gradient(180deg, color-mix(in srgb, var(--sektion73-route-color) 10%, transparent) 0%, transparent 100%);",
        "  position: relative;",
        "}",
        ".sektion73LedDetailHero::after {",
        "  content: ''; position: absolute; left: 0; right: 0; top: 0; height: 3px;",
        "  background: var(--sektion73-route-color);",
        "}",
        ".sektion73LedDetailHeroIco {",
        "  width: 44px; height: 44px;",
        "  border-radius: 999px;",
        "  background: #fff;",
        "  display: inline-flex; align-items: center; justify-content: center;",
        "  flex-shrink: 0;",
        "  box-shadow: 0 2px 8px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04);",
        "}",
        ".sektion73LedDetailHeroIco svg { width: 24px; height: 24px; }",
        ".sektion73LedDetailHeroText { display: flex; flex-direction: column; gap: 4px; min-width: 0; width: 100%; }",
        ".sektion73LedDetailTitle {",
        "  font: 700 19px/1.2 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #1a1a1a;",
        "  letter-spacing: -0.01em;",
        "}",
        "/* Stat-grid */",
        ".sektion73LedDetailStats {",
        "  display: grid; grid-template-columns: 1fr auto 1fr;",
        "  align-items: stretch;",
        "  padding: 14px 16px;",
        "}",
        ".sektion73LedDetailStat { text-align: left; padding: 2px 4px; }",
        ".sektion73LedDetailStatValue {",
        "  font: 700 20px/1.1 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #1a1a1a;",
        "  letter-spacing: -0.01em;",
        "  font-variant-numeric: tabular-nums;",
        "}",
        ".sektion73LedDetailStatLabel {",
        "  font: 500 12px/1.2 'Inter','Manrope',system-ui,sans-serif;",
        "  color: #616161;",
        "  letter-spacing: .03em;",
        "  text-transform: uppercase;",
        "  margin-top: 4px;",
        "}",
        ".sektion73LedDetailStatDivider {",
        "  width: 1px;",
        "  background: rgba(0,0,0,.06);",
        "  margin: 0 8px;",
        "}"
      ].join("\n");
      document.head.appendChild(s);
    }

    // Material Symbols Outlined-font — injicera om saknas
    function sektion73EnsureMaterialSymbols() {
      var sel = 'link[href*="Material+Symbols+Outlined"]';
      if (document.querySelector(sel)) return;
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
      document.head.appendChild(link);
    }

    /* =========================
       UI-bygget — chip i rail + sliding card
       ========================= */
    var sektion73Icons = {
      walk: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/></svg>',
      bike: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M5 20.5C3.07 20.5 1.5 18.93 1.5 17S3.07 13.5 5 13.5 8.5 15.07 8.5 17 6.93 20.5 5 20.5zm0-5.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5.8-10L12.5 8H15v6h-1l-4-4-1.5 1.5 4 4V20h-1.5v-3l-3-3-1.6 1.6 4.6 4.6V20h3v-5.5l-2.7-2.7 1-1L18 14.5V20h1.5V14l-3.4-3.4 1-1 .9.9c0 .5.4 1 1 1s1-.4 1-1-.5-1-1-1-1 .5-1 1c0 .2.1.4.2.5L17 11.6l-3.5-3.5 1.6-1.6.6.6c.2.2.4.3.7.3.5 0 1-.4 1-1s-.5-1-1-1c-.3 0-.5.1-.7.3l-3.5 3.5L11 7.5 13 5.5l.6.6c.2.2.4.3.7.3.5 0 1-.5 1-1s-.5-1-1-1c-.3 0-.5.1-.7.3l-3 3.1z"/></svg>',
      trail: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">' +
             '<path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/></svg>'
    };
    var sektion73ArrowBackSvg =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>' +
      '</svg>';

    // Global koordinator: bara EN route får vara aktiv åt gången
    var sektion73ActiveRouteCloser = null;

    function sektion73BuildRouteButtons(container) {
      sektion73InjectRouteCSS();
      if (!container) return;

      var filterBar = document.getElementById("sektion73MapFilterBar");
      var mapRoot   = document.getElementById("sektion73MapRoot") || document.body;

      // Pre-beräkna distans/tid per route (för list-vyns meta-text)
      var routeMeta = {};
      sektion73Routes.forEach(function (r) {
        if (r.coords) {
          var ds = sektion73MeasureRoute(r.coords);
          var totalM = ds[ds.length - 1];
          var pace = r.paceMps || 1.4;
          routeMeta[r.id] = {
            distanceM: totalM,
            durationS: totalM / pace,
            dists: ds
          };
        }
      });

      // ---- En chip i railen ("Leder") ----
      var chip = document.createElement("div");
      chip.className = "sektion73FilterBtn sektion73PromenadChip";
      chip.setAttribute("data-filter", "__leder_chip__");
      chip.setAttribute("role", "button");
      chip.setAttribute("tabindex", "0");
      chip.innerHTML =
        '<span class="sektion73FilterIco">' + sektion73Icons.trail + '</span>' +
        '<span>Leder</span>';

      // ---- Ett kort med TVÅ vyer: list + detail ----
      var card = document.createElement("div");
      card.className = "sektion73PromenadCard sektion73PromenadCardHidden";
      card.id = "sektion73LedCard";

      // Bygg list-items från sektion73Routes
      var listItemsHtml = sektion73Routes.map(function (r) {
        var icon = sektion73Icons[r.iconKey] || sektion73Icons.walk;
        var color = (r.line && r.line.color) || "#F0A500";
        var meta = routeMeta[r.id];
        var distStr = meta ? sektion73FormatDist(meta.distanceM) : "—";
        var timeStr = meta ? sektion73FormatTime(meta.durationS) : "—";
        return (
          '<button type="button" class="sektion73LedItem" data-route-id="' + r.id + '">' +
            '<span class="sektion73LedItemIco" style="color:' + color + '">' + icon + '</span>' +
            '<span class="sektion73LedItemInfo">' +
              '<span class="sektion73LedItemTitle">' + (r.cardTitle || r.chipLabel || "Led") + '</span>' +
              '<span class="sektion73LedItemMeta">' + distStr + ' · ' + timeStr + ' · ' + (r.rowLabel || "Gångväg") + '</span>' +
            '</span>' +
            '<span class="sektion73LedItemArrow">' +
              '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>' +
            '</span>' +
          '</button>'
        );
      }).join("");

      card.innerHTML =
        '<div class="sektion73LedListView">' +
          '<div class="sektion73LedList">' + listItemsHtml + '</div>' +
          '<div class="sektion73PromenadCardSep"></div>' +
          '<button type="button" class="sektion73PromenadCardBack" data-action="close-all">' +
            '<span class="sektion73PromenadCardBackIco">' + sektion73ArrowBackSvg + '</span>' +
            '<span>Tillbaka till kartan</span>' +
          '</button>' +
        '</div>' +
        '<div class="sektion73LedDetailView" hidden>' +
          '<div class="sektion73LedDetailHero" data-ref="detail-hero">' +
            '<div class="sektion73LedDetailHeroIco" data-ref="detail-icon"></div>' +
            '<div class="sektion73LedDetailHeroText">' +
              '<div class="sektion73LedDetailTitle" data-ref="detail-title"></div>' +
            '</div>' +
          '</div>' +
          '<div class="sektion73LedDetailStats">' +
            '<div class="sektion73LedDetailStat">' +
              '<div class="sektion73LedDetailStatValue" data-ref="detail-dist">·</div>' +
              '<div class="sektion73LedDetailStatLabel">Sträcka</div>' +
            '</div>' +
            '<div class="sektion73LedDetailStatDivider"></div>' +
            '<div class="sektion73LedDetailStat">' +
              '<div class="sektion73LedDetailStatValue" data-ref="detail-time">·</div>' +
              '<div class="sektion73LedDetailStatLabel">Tid</div>' +
            '</div>' +
          '</div>' +
          '<div class="sektion73PromenadCardSep"></div>' +
          '<button type="button" class="sektion73PromenadCardBack" data-action="back-to-list">' +
            '<span class="sektion73PromenadCardBackIco">' + sektion73ArrowBackSvg + '</span>' +
            '<span>Tillbaka till leder</span>' +
          '</button>' +
        '</div>';

      mapRoot.appendChild(card);

      var listView   = card.querySelector(".sektion73LedListView");
      var detailView = card.querySelector(".sektion73LedDetailView");
      var detailHero  = detailView.querySelector('[data-ref="detail-hero"]');
      var detailIcon  = detailView.querySelector('[data-ref="detail-icon"]');
      var detailTitle = detailView.querySelector('[data-ref="detail-title"]');
      var detailTime  = detailView.querySelector('[data-ref="detail-time"]');
      var detailDist  = detailView.querySelector('[data-ref="detail-dist"]');

      // ---- State ----
      var currentRoute = null;
      var savedCameraState = null;

      // ---- Vy-switching ----
      function showListView() {
        detailView.hidden = true;
        listView.hidden = false;
        listView.classList.remove("is-fading-out");
        detailView.classList.remove("is-fading-in");
      }

      function showDetailView() {
        listView.hidden = true;
        detailView.hidden = false;
      }

      // ---- Kort glider upp / ner ----
      function openCard() {
        if (filterBar) filterBar.classList.add("sektion73FilterBarHidden");
        requestAnimationFrame(function () {
          card.classList.remove("sektion73PromenadCardHidden");
        });
      }

      function closeCard() {
        card.classList.add("sektion73PromenadCardHidden");
        if (filterBar) filterBar.classList.remove("sektion73FilterBarHidden");
      }

      // ---- Visa rutt på kartan ----
      function startRoute(route) {
        // Snapshot kameraläget en gång (innan första rutten visas)
        if (!savedCameraState) {
          var c = sektion73Map.getCenter();
          savedCameraState = {
            center: [c.lng, c.lat],
            zoom: sektion73Map.getZoom(),
            pitch: sektion73Map.getPitch(),
            bearing: sektion73Map.getBearing()
          };
        }

        // Dölj pins
        document.body.classList.add("sektion73-route-active");

        // Populera detail-vy
        var iconSvg = sektion73Icons[route.iconKey] || sektion73Icons.walk;
        var color = (route.line && route.line.color) || "#F0A500";
        var meta = routeMeta[route.id];
        detailHero.style.setProperty("--sektion73-route-color", color);
        detailIcon.innerHTML = iconSvg;
        detailIcon.style.color = color;
        detailTitle.textContent = route.cardTitle || route.chipLabel || "Led";
        detailTime.textContent = meta ? sektion73FormatTime(meta.durationS) : "—";
        detailDist.textContent = meta ? sektion73FormatDist(meta.distanceM) : "—";

        showDetailView();

        // Starta route-animation
        var cachedRoute = meta
          ? { coords: route.coords, distanceM: meta.distanceM, durationS: meta.durationS }
          : null;
        if (!cachedRoute && route.coords) {
          var ds = sektion73MeasureRoute(route.coords);
          var totalM = ds[ds.length - 1];
          cachedRoute = { coords: route.coords, distanceM: totalM, durationS: totalM / (route.paceMps || 1.4) };
        }
        if (cachedRoute) {
          sektion73AnimateRoute(route, cachedRoute, function () {}, null);
        }

        currentRoute = route;
      }

      function stopRoute(restoreCamera) {
        if (currentRoute) {
          sektion73ClearRoute(currentRoute.id);
          currentRoute = null;
        }
        // Visa pins igen
        document.body.classList.remove("sektion73-route-active");

        if (restoreCamera && savedCameraState) {
          sektion73Map.easeTo({
            center: savedCameraState.center,
            zoom: savedCameraState.zoom,
            pitch: savedCameraState.pitch,
            bearing: savedCameraState.bearing,
            duration: 1400,
            easing: function (t) { return 1 - Math.pow(1 - t, 3); }
          });
        }
      }

      // ---- Klick-hanterare ----
      chip.addEventListener("click", function () {
        // Stäng eventuell tidigare aktivitet
        if (sektion73ActiveRouteCloser) sektion73ActiveRouteCloser(true);
        sektion73ActiveRouteCloser = function () {
          stopRoute(false);
          closeCard();
          savedCameraState = null;
          if (sektion73ActiveRouteCloser === arguments.callee) sektion73ActiveRouteCloser = null;
        };
        showListView();
        openCard();
      });
      chip.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); chip.click(); }
      });

      // List-items
      card.querySelectorAll(".sektion73LedItem").forEach(function (item) {
        item.addEventListener("click", function () {
          var rid = item.getAttribute("data-route-id");
          var route = sektion73Routes.find(function (r) { return r.id === rid; });
          if (!route) return;
          // Om annan rutt redan ritas — clearas först
          if (currentRoute) sektion73ClearRoute(currentRoute.id);
          startRoute(route);
        });
      });

      // Back-knappar (delegerat)
      card.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-action]");
        if (!btn) return;
        var action = btn.getAttribute("data-action");
        if (action === "back-to-list") {
          // Stoppa rutt, återställ kamera, gå tillbaka till list-vy
          stopRoute(true);
          showListView();
        } else if (action === "close-all") {
          // Stäng allt
          stopRoute(true);
          closeCard();
          savedCameraState = null;
          sektion73ActiveRouteCloser = null;
          // Återställ map-padding (mobile) så kartan inte ligger kvar med skiftat center
          if (sektion73IsMobile()) {
            sektion73Map.easeTo({
              padding: { top: 0, bottom: 0, left: 0, right: 0 },
              duration: 420
            });
          }
        }
      });

      container.appendChild(chip);
    }

    // Vänta tills filter-rail finns i DOM, lägg sedan knappen sist (= längst till höger)
    function sektion73AttachToFilterRail() {
      var rail = document.getElementById("sektion73MapFilterRail");
      if (rail) {
        sektion73BuildRouteButtons(rail);
        return;
      }
      var obs = new MutationObserver(function () {
        var r = document.getElementById("sektion73MapFilterRail");
        if (r) {
          obs.disconnect();
          sektion73BuildRouteButtons(r);
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }

    /* =========================
       Markör-polering (gedigen UI/UX-uppgradering)
       — normaliserar storlekar, finputsar skugga/border,
         lägger till hover/active/scale-på-zoom
       ========================= */
    function sektion73InjectMarkerPolishCSS() {
      if (document.getElementById("sektion73MarkerPolishCss")) return;
      var s = document.createElement("style");
      s.id = "sektion73MarkerPolishCss";
      s.textContent = [
        "/* === Markör-polering === */",
        "/* Normalisera ikon-yta (alla logotyper får samma storlek + centrering) */",
        "#sektion73MapCanvas .sektion73PinIco {",
        "  display: inline-flex; align-items: center; justify-content: center;",
        "  width: 28px; height: 28px;",
        "  overflow: hidden;",
        "}",
        "#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco img,",
        "#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco svg {",
        "  width: auto !important;",
        "  height: auto !important;",
        "  max-width: 28px !important;",
        "  max-height: 28px !important;",
        "  object-fit: contain;",
        "  display: block;",
        "}",
        "/* Text-baserade markörer (span) — konsekvent typografi */",
        "#sektion73MapCanvas .sektion73PinIco span {",
        "  font-size: 10px !important;",
        "  line-height: 1.05 !important;",
        "  font-weight: 700 !important;",
        "  letter-spacing: .02em;",
        "}",
        "/* Bubble — mer förfinad: mindre padding, lättare border, multi-layer-skugga */",
        "#sektion73MapCanvas .sektion73PinBubble {",
        "  padding: 6px 7px !important;",
        "  gap: 6px !important;",
        "  border: 1px solid rgba(0,0,0,.06) !important;",
        "  box-shadow:",
        "    0 1px 2px rgba(0,0,0,.06),",
        "    0 4px 12px rgba(0,0,0,.12),",
        "    0 12px 32px rgba(0,0,0,.08) !important;",
        "  transform: scale(var(--sektion73-pin-scale, 1));",
        "  transform-origin: 50% 100%;",
        "  transition:",
        "    transform 220ms cubic-bezier(.2,.8,.2,1),",
        "    box-shadow 220ms ease,",
        "    border-color 220ms ease !important;",
        "  will-change: transform;",
        "}",
        "/* Pointer — finare proportioner + matchande skugga */",
        "#sektion73MapCanvas .sektion73PinPointer {",
        "  border-left-width: 6px !important;",
        "  border-right-width: 6px !important;",
        "  border-top-width: 7px !important;",
        "  margin-top: -1px;",
        "  filter:",
        "    drop-shadow(0 2px 3px rgba(0,0,0,.10))",
        "    drop-shadow(0 0 1px rgba(0,0,0,.04)) !important;",
        "  transform: scale(var(--sektion73-pin-scale, 1));",
        "  transform-origin: 50% 0%;",
        "  transition: transform 220ms cubic-bezier(.2,.8,.2,1);",
        "}",
        "/* Hover-läge: lyft + lite större + djupare skugga */",
        "#sektion73MapCanvas .sektion73PinWrap:hover { z-index: 9999; }",
        "#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBubble {",
        "  transform: scale(calc(var(--sektion73-pin-scale, 1) * 1.08)) translateY(-3px) !important;",
        "  box-shadow:",
        "    0 2px 4px rgba(0,0,0,.08),",
        "    0 10px 24px rgba(0,0,0,.18),",
        "    0 22px 48px rgba(0,0,0,.10) !important;",
        "  border-color: rgba(0,0,0,.12) !important;",
        "}",
        "#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinPointer {",
        "  transform: scale(calc(var(--sektion73-pin-scale, 1) * 1.08)) translateY(-3px);",
        "}",
        "/* Active (klick) — liten press-effekt */",
        "#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBubble {",
        "  transform: scale(calc(var(--sektion73-pin-scale, 1) * 1.02)) translateY(-1px) !important;",
        "  transition-duration: 80ms !important;",
        "}",
        "/* Dölj den lilla \"dot\"-elementet (används inte, skapar bara extra gap) */",
        "#sektion73MapCanvas .sektion73PinDot { display: none !important; }",
        "/* Desktop: större logotyper för bättre synlighet */",
        "@media (min-width: 769px) {",
        "  #sektion73MapCanvas .sektion73PinIco {",
        "    width: 36px; height: 36px;",
        "  }",
        "  #sektion73MapCanvas .sektion73PinBubble .sektion73PinIco img,",
        "  #sektion73MapCanvas .sektion73PinBubble .sektion73PinIco svg {",
        "    max-width: 36px !important;",
        "    max-height: 36px !important;",
        "  }",
        "  #sektion73MapCanvas .sektion73PinIco span {",
        "    font-size: 12px !important;",
        "  }",
        "  #sektion73MapCanvas .sektion73PinBubble {",
        "    padding: 7px 9px !important;",
        "  }",
        "}"
      ].join("\n");
      document.head.appendChild(s);
    }

    // Skala markörerna mjukt baserat på zoom (mindre när utzoomat, full storlek när inzoomat)
    function sektion73UpdatePinScale() {
      var z = sektion73Map.getZoom();
      // Linjär interpolation: zoom 14 → 0.82, zoom 16.5 → 1.0
      var scale;
      if (z >= 16.5) scale = 1;
      else if (z <= 14) scale = 0.82;
      else scale = 0.82 + (z - 14) * (0.18 / 2.5);
      document.documentElement.style.setProperty("--sektion73-pin-scale", scale.toFixed(3));
    }

    /* =========================
       Init (sektion 13)
       ========================= */
    sektion73InjectMarkerPolishCSS();
    sektion73UpdatePinScale();
    sektion73Map.on("zoom", sektion73UpdatePinScale);
    sektion73AttachToFilterRail();
  }
})();
