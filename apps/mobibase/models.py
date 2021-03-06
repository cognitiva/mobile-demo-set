from google.appengine.ext import db

class Vbak(db.Model):
    mandt = db.StringProperty()
    vbeln = db.StringProperty()
    erdat = db.DateProperty()
    erzet = db.TimeProperty()
    ernam = db.StringProperty()
    angdt = db.DateProperty()
    bnddt = db.DateProperty()
    audat = db.DateProperty()
    vbtyp = db.StringProperty()
    trvog = db.StringProperty()
    auart = db.StringProperty()
    augru = db.StringProperty()
    gwldt = db.DateProperty()
    submi = db.StringProperty()
    lifsk = db.StringProperty()
    faksk = db.StringProperty()
    netwr = db.FloatProperty()
    waerk = db.StringProperty()
    vkorg = db.StringProperty()
    vtweg = db.StringProperty()
    spart = db.StringProperty()
    vkgrp = db.StringProperty()
    vkbur = db.StringProperty()
    gsber = db.StringProperty()
    gskst = db.StringProperty()
    guebg = db.DateProperty()
    gueen = db.DateProperty()
    knumv = db.StringProperty()
    vdatu = db.DateProperty()
    vprgr = db.StringProperty()
    autlf = db.StringProperty()
    vbkla = db.StringProperty()
    vbklt = db.StringProperty()
    kalsm = db.StringProperty()
    vsbed = db.StringProperty()
    fkara = db.StringProperty()
    awahr = db.StringProperty()
    ktext = db.StringProperty()
    bstnk = db.StringProperty()
    bsark = db.StringProperty()
    bstdk = db.DateProperty()
    bstzd = db.StringProperty()
    ihrez = db.StringProperty()
    bname = db.StringProperty()
    telf1 = db.StringProperty()
    mahza = db.FloatProperty()
    mahdt = db.DateProperty()
    kunnr = db.StringProperty()
    kostl = db.StringProperty()
    stafo = db.StringProperty()
    stwae = db.StringProperty()
    aedat = db.DateProperty()
    kvgr1 = db.StringProperty()
    kvgr2 = db.StringProperty()
    kvgr3 = db.StringProperty()
    kvgr4 = db.StringProperty()
    kvgr5 = db.StringProperty()
    knuma = db.StringProperty()
    kokrs = db.StringProperty()
    ps_psp_pnr = db.StringProperty()
    kurst = db.StringProperty()
    kkber = db.StringProperty()
    knkli = db.StringProperty()
    grupp = db.StringProperty()
    sbgrp = db.StringProperty()
    ctlpc = db.StringProperty()
    cmwae = db.StringProperty()
    cmfre = db.DateProperty()
    cmnup = db.DateProperty()
    cmngv = db.DateProperty()
    amtbl = db.FloatProperty()
    hityp_pr = db.StringProperty()
    abrvw = db.StringProperty()
    abdis = db.StringProperty()
    vgbel = db.StringProperty()
    objnr = db.StringProperty()
    bukrs_vf = db.StringProperty()
    taxk1 = db.StringProperty()
    taxk2 = db.StringProperty()
    taxk3 = db.StringProperty()
    taxk4 = db.StringProperty()
    taxk5 = db.StringProperty()
    taxk6 = db.StringProperty()
    taxk7 = db.StringProperty()
    taxk8 = db.StringProperty()
    taxk9 = db.StringProperty()
    xblnr = db.StringProperty()
    zuonr = db.StringProperty()
    vgtyp = db.StringProperty()
    kalsm_ch = db.StringProperty()
    agrzr = db.StringProperty()
    aufnr = db.StringProperty()
    qmnum = db.StringProperty()
    vbeln_grp = db.StringProperty()
    scheme_grp = db.StringProperty()
    abruf_part = db.StringProperty()
    abhod = db.DateProperty()
    abhov = db.TimeProperty()
    abhob = db.TimeProperty()
    rplnr = db.StringProperty()
    vzeit = db.TimeProperty()
    stceg_l = db.StringProperty()
    landtx = db.StringProperty()
    xegdr = db.StringProperty()
    enqueue_grp = db.StringProperty()
    dat_fzau = db.DateProperty()
    fmbdat = db.DateProperty()
    vsnmr_v = db.StringProperty()
    handle = db.StringProperty()
    proli = db.StringProperty()
    cont_dg = db.StringProperty()
    crm_guid = db.StringProperty()
    swenr = db.StringProperty()
    smenr = db.StringProperty()
    phase = db.StringProperty()
    mtlaur = db.StringProperty()
    stage = db.IntegerProperty()
    hb_cont_reason = db.StringProperty()
    hb_expdate = db.DateProperty()
    hb_resdate = db.DateProperty()
    logsysb = db.StringProperty()
    kalcd = db.StringProperty()
    multi = db.StringProperty()


class Vbap(db.Model):
    mandt = db.StringProperty()
    vbeln = db.StringProperty()
    posnr = db.StringProperty()
    matnr = db.StringProperty()
    matwa = db.StringProperty()
    pmatn = db.StringProperty()
    charg = db.StringProperty()
    matkl = db.StringProperty()
    arktx = db.StringProperty()
    pstyv = db.StringProperty()
    posar = db.StringProperty()
    lfrel = db.StringProperty()
    fkrel = db.StringProperty()
    uepos = db.StringProperty()
    grpos = db.StringProperty()
    abgru = db.StringProperty()
    prodh = db.StringProperty()
    zwert = db.FloatProperty()
    zmeng = db.FloatProperty()
    zieme = db.StringProperty()
    umziz = db.FloatProperty()
    umzin = db.FloatProperty()
    meins = db.StringProperty()
    smeng = db.FloatProperty()
    ablfz = db.FloatProperty()
    abdat = db.DateProperty()
    absfz = db.FloatProperty()
    posex = db.StringProperty()
    kdmat = db.StringProperty()
    kbver = db.FloatProperty()
    kever = db.FloatProperty()
    vkgru = db.StringProperty()
    vkaus = db.StringProperty()
    grkor = db.StringProperty()
    fmeng = db.StringProperty()
    uebtk = db.StringProperty()
    uebto = db.FloatProperty()
    untto = db.FloatProperty()
    faksp = db.StringProperty()
    atpkz = db.StringProperty()
    rkfkf = db.StringProperty()
    spart = db.StringProperty()
    gsber = db.StringProperty()
    netwr = db.FloatProperty()
    waerk = db.StringProperty()
    antlf = db.FloatProperty()
    kztlf = db.StringProperty()
    chspl = db.StringProperty()
    kwmeng = db.FloatProperty()
    lsmeng = db.FloatProperty()
    kbmeng = db.FloatProperty()
    klmeng = db.FloatProperty()
    vrkme = db.StringProperty()
    umvkz = db.FloatProperty()
    umvkn = db.FloatProperty()
    brgew = db.FloatProperty()
    ntgew = db.FloatProperty()
    gewei = db.StringProperty()
    volum = db.FloatProperty()
    voleh = db.StringProperty()
    vbelv = db.StringProperty()
    posnv = db.StringProperty()
    vgbel = db.StringProperty()
    vgpos = db.StringProperty()
    voref = db.StringProperty()
    upflu = db.StringProperty()
    erlre = db.StringProperty()
    lprio = db.StringProperty()
    werks = db.StringProperty()
    lgort = db.StringProperty()
    vstel = db.StringProperty()
    route = db.StringProperty()
    stkey = db.StringProperty()
    stdat = db.DateProperty()
    stlnr = db.StringProperty()
    stpos = db.FloatProperty()
    awahr = db.StringProperty()
    erdat = db.DateProperty()
    ernam = db.StringProperty()
    erzet = db.TimeProperty()
    taxm1 = db.StringProperty()
    taxm2 = db.StringProperty()
    taxm3 = db.StringProperty()
    taxm4 = db.StringProperty()
    taxm5 = db.StringProperty()
    taxm6 = db.StringProperty()
    taxm7 = db.StringProperty()
    taxm8 = db.StringProperty()
    taxm9 = db.StringProperty()
    vbeaf = db.FloatProperty()
    vbeav = db.FloatProperty()
    vgref = db.StringProperty()
    netpr = db.FloatProperty()
    kpein = db.FloatProperty()
    kmein = db.StringProperty()
    shkzg = db.StringProperty()
    sktof = db.StringProperty()
    mtvfp = db.StringProperty()
    sumbd = db.StringProperty()
    kondm = db.StringProperty()
    ktgrm = db.StringProperty()
    bonus = db.StringProperty()
    provg = db.StringProperty()
    eannr = db.StringProperty()
    prsok = db.StringProperty()
    bwtar = db.StringProperty()
    bwtex = db.StringProperty()
    xchpf = db.StringProperty()
    xchar = db.StringProperty()
    lfmng = db.FloatProperty()
    stafo = db.StringProperty()
    wavwr = db.FloatProperty()
    kzwi1 = db.FloatProperty()
    kzwi2 = db.FloatProperty()
    kzwi3 = db.FloatProperty()
    kzwi4 = db.FloatProperty()
    kzwi5 = db.FloatProperty()
    kzwi6 = db.FloatProperty()
    stcur = db.FloatProperty()
    aedat = db.DateProperty()
    ean11 = db.StringProperty()
    fixmg = db.StringProperty()
    prctr = db.StringProperty()
    mvgr1 = db.StringProperty()
    mvgr2 = db.StringProperty()
    mvgr3 = db.StringProperty()
    mvgr4 = db.StringProperty()
    mvgr5 = db.StringProperty()
    kmpmg = db.FloatProperty()
    sugrd = db.StringProperty()
    sobkz = db.StringProperty()
    vpzuo = db.StringProperty()
    paobjnr = db.StringProperty()
    ps_psp_pnr = db.StringProperty()
    aufnr = db.StringProperty()
    vpmat = db.StringProperty()
    vpwrk = db.StringProperty()
    prbme = db.StringProperty()
    umref = db.FloatProperty()
    knttp = db.StringProperty()
    kzvbr = db.StringProperty()
    sernr = db.StringProperty()
    objnr = db.StringProperty()
    abgrs = db.StringProperty()
    bedae = db.StringProperty()
    cmpre = db.FloatProperty()
    cmtfg = db.StringProperty()
    cmpnt = db.StringProperty()
    cmkua = db.FloatProperty()
    cuobj = db.StringProperty()
    cuobj_ch = db.StringProperty()
    cepok = db.StringProperty()
    koupd = db.StringProperty()
    serail = db.StringProperty()
    anzsn = db.IntegerProperty()
    nachl = db.StringProperty()
    magrv = db.StringProperty()
    mprok = db.StringProperty()
    vgtyp = db.StringProperty()
    prosa = db.StringProperty()
    uepvw = db.StringProperty()
    kalnr = db.StringProperty()
    klvar = db.StringProperty()
    sposn = db.StringProperty()
    kowrr = db.StringProperty()
    stadat = db.DateProperty()
    exart = db.StringProperty()
    prefe = db.StringProperty()
    knumh = db.StringProperty()
    clint = db.StringProperty()
    chmvs = db.StringProperty()
    stlty = db.StringProperty()
    stlkn = db.StringProperty()
    stpoz = db.StringProperty()
    stman = db.StringProperty()
    zschl_k = db.StringProperty()
    kalsm_k = db.StringProperty()
    kalvar = db.StringProperty()
    kosch = db.StringProperty()
    upmat = db.StringProperty()
    ukonm = db.StringProperty()
    mfrgr = db.StringProperty()
    plavo = db.StringProperty()
    kannr = db.StringProperty()
    cmpre_flt = db.FloatProperty()
    abfor = db.StringProperty()
    abges = db.FloatProperty()
    j_1bcfop = db.StringProperty()
    j_1btaxlw1 = db.StringProperty()
    j_1btaxlw2 = db.StringProperty()
    j_1btxsdc = db.StringProperty()
    wktnr = db.StringProperty()
    wktps = db.StringProperty()
    skopf = db.StringProperty()
    kzbws = db.StringProperty()
    wgru1 = db.StringProperty()
    wgru2 = db.StringProperty()
    knuma_pi = db.StringProperty()
    knuma_ag = db.StringProperty()
    kzfme = db.StringProperty()
    lstanr = db.StringProperty()
    techs = db.StringProperty()
    mwsbp = db.FloatProperty()
    berid = db.StringProperty()
    pctrf = db.StringProperty()
    logsys_ext = db.StringProperty()
    j_1btaxlw3 = db.StringProperty()
    _bev1_srfund = db.StringProperty()
    kostl = db.StringProperty()
    fonds = db.StringProperty()
    fistl = db.StringProperty()
    fkber = db.StringProperty()
    grant_nbr = db.StringProperty()
    zzdea_license = db.StringProperty()
    zzdea_schedule = db.StringProperty()


class Vbuk(db.Model):
    mandt = db.StringProperty()
    vbeln = db.StringProperty()
    rfstk = db.StringProperty()
    rfgsk = db.StringProperty()
    bestk = db.StringProperty()
    lfstk = db.StringProperty()
    lfgsk = db.StringProperty()
    wbstk = db.StringProperty()
    fkstk = db.StringProperty()
    fksak = db.StringProperty()
    buchk = db.StringProperty()
    abstk = db.StringProperty()
    gbstk = db.StringProperty()
    kostk = db.StringProperty()
    lvstk = db.StringProperty()
    uvals = db.StringProperty()
    uvvls = db.StringProperty()
    uvfas = db.StringProperty()
    uvall = db.StringProperty()
    uvvlk = db.StringProperty()
    uvfak = db.StringProperty()
    uvprs = db.StringProperty()
    vbtyp = db.StringProperty()
    vbobj = db.StringProperty()
    aedat = db.DateProperty()
    fkivk = db.StringProperty()
    relik = db.StringProperty()
    uvk01 = db.StringProperty()
    uvk02 = db.StringProperty()
    uvk03 = db.StringProperty()
    uvk04 = db.StringProperty()
    uvk05 = db.StringProperty()
    uvs01 = db.StringProperty()
    uvs02 = db.StringProperty()
    uvs03 = db.StringProperty()
    uvs04 = db.StringProperty()
    uvs05 = db.StringProperty()
    pkstk = db.StringProperty()
    cmpsa = db.StringProperty()
    cmpsb = db.StringProperty()
    cmpsc = db.StringProperty()
    cmpsd = db.StringProperty()
    cmpse = db.StringProperty()
    cmpsf = db.StringProperty()
    cmpsg = db.StringProperty()
    cmpsh = db.StringProperty()
    cmpsi = db.StringProperty()
    cmpsj = db.StringProperty()
    cmpsk = db.StringProperty()
    cmpsl = db.StringProperty()
    cmps0 = db.StringProperty()
    cmps1 = db.StringProperty()
    cmps2 = db.StringProperty()
    cmgst = db.StringProperty()
    trsta = db.StringProperty()
    koquk = db.StringProperty()
    costa = db.StringProperty()
    saprl = db.StringProperty()
    uvpas = db.StringProperty()
    uvpis = db.StringProperty()
    uvwas = db.StringProperty()
    uvpak = db.StringProperty()
    uvpik = db.StringProperty()
    uvwak = db.StringProperty()
    uvgek = db.StringProperty()
    cmpsm = db.StringProperty()
    dcstk = db.StringProperty()
    vestk = db.StringProperty()
    vlstk = db.StringProperty()
    rrsta = db.StringProperty()
    block = db.StringProperty()
    fsstk = db.StringProperty()
    lsstk = db.StringProperty()
    spstg = db.StringProperty()
    pdstk = db.StringProperty()
    fmstk = db.StringProperty()
    manek = db.StringProperty()
    spe_tmpid = db.StringProperty()
    hdall = db.StringProperty()
    hdals = db.StringProperty()
    cmps_cm = db.StringProperty()
