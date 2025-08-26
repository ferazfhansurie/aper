-- ----------------------------------------------------------
-- MDB Tools - A library for reading MS Access database files
-- Copyright (C) 2000-2011 Brian Bruns and others.
-- Files in libmdb are licensed under LGPL and the utilities under
-- the GPL, see COPYING.LIB and COPYING files respectively.
-- Check out http://mdbtools.sourceforge.net
-- ----------------------------------------------------------

SET client_encoding = 'UTF-8';

CREATE TABLE IF NOT EXISTS "(old 20130624) link_country"
 (
	"id_country"			SERIAL, 
	"country (short form)"			VARCHAR (255), 
	"country (official long form)"			VARCHAR (255), 
	"displayed country in databank"			VARCHAR (255), 
	"displayed country region in databank level 1"			VARCHAR (255), 
	"ranking of country region in databank"			DOUBLE PRECISION, 
	"country region level 2"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "(old 20130624) link_country" ADD CONSTRAINT "(old 20130624) link_country_pkey" PRIMARY KEY ("id_country");

CREATE TABLE IF NOT EXISTS "2nd deal for a company"
 (
	"id"			INTEGER NOT NULL, 
	"(old 20110617) identification"			VARCHAR (255), 
	"(old 20110617) investee company name"			VARCHAR (255), 
	"2nd deal id"			SERIAL, 
	"link investor id (investee for investmentrd)"			INTEGER, 
	"link_valuation record id"			INTEGER, 
	"include in calculation in databank (pe firm invest) (paid member"			BOOLEAN NOT NULL, 
	"include in calculation in databank (pe firm invest) (trial vers"			BOOLEAN NOT NULL, 
	"show this deal in databank (pe firm invest) (trial version)"			BOOLEAN NOT NULL, 
	"(old 20110803) month"			VARCHAR (255), 
	"link_year id_deal_disclose_year"			INTEGER, 
	"link_month id_deal_disclose_month"			INTEGER, 
	"link_data source id_deal_disclose_date"			INTEGER, 
	"expected_deal_complete_date_begin"			TIMESTAMP WITHOUT TIME ZONE, 
	"expected_deal_complete_date_end"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_data source id_deal_expected_complete_date"			INTEGER, 
	"link_year id (invest year)"			INTEGER NOT NULL, 
	"link_month id (invest month)"			INTEGER NOT NULL, 
	"link_data source id (deal info - source)"			INTEGER, 
	"link_country id (investee location at investment date)"			INTEGER NOT NULL, 
	"invest date remarks"			TEXT, 
	"non-pe deal?"			BOOLEAN NOT NULL, 
	"syndication"			BOOLEAN NOT NULL, 
	"link_fundingrd_cat_prefix_id_investrd"			INTEGER, 
	"link_fundingrd_cat_main_id_investrd"			INTEGER, 
	"link_fundingrd_cat_suffix_1_id_investrd"			INTEGER, 
	"link_fundingrd_cat_suffix_2_id_investrd"			INTEGER, 
	"displayed investor name"			TEXT, 
	"displayed investor name verification status (20110801)"			VARCHAR (255), 
	"pe investor"			TEXT, 
	"pe investor:regional/country"			TEXT, 
	"pe investor:base office"			TEXT, 
	"name of pe fund involved in the investment"			TEXT, 
	"yuan-denominated fund"			BOOLEAN NOT NULL, 
	"hedge fund investor"			TEXT, 
	"hf location"			TEXT, 
	"corporate venturing firms"			TEXT, 
	"location of corporate venture"			TEXT, 
	"fund of funds"			TEXT, 
	"fund of funds location"			TEXT, 
	"institutional investor"			TEXT, 
	"ii location"			TEXT, 
	"family office"			TEXT, 
	"family office location"			TEXT, 
	"sovereign fund"			TEXT, 
	"sf location"			TEXT, 
	"other investor"			TEXT, 
	"lead investor"			TEXT, 
	"credit investor_pe"			TEXT, 
	"credit investor_corporate venture"			TEXT, 
	"credit investor_institutional investor"			TEXT, 
	"local currency code"			VARCHAR (3), 
	"deal size (local currency)"			DOUBLE PRECISION, 
	"pe portion (local currency)"			DOUBLE PRECISION, 
	"pe equity amount (local currency)"			DOUBLE PRECISION, 
	"pe_equity_rmb_fund_invest_amt_lc_m"			DOUBLE PRECISION, 
	"mezzanine amount (local currency million)"			DOUBLE PRECISION, 
	"credit amount (local currency million)"			DOUBLE PRECISION, 
	"deal size (us$ m)"			DOUBLE PRECISION, 
	"link_deal size type id"			INTEGER, 
	"pe portion"			DOUBLE PRECISION, 
	"pe equity amount (us$m)"			DOUBLE PRECISION, 
	"pe_equity_rmb_fund_invest_amt_usd_m"			DOUBLE PRECISION, 
	"mezzanine amount (us$ m)"			DOUBLE PRECISION, 
	"credit amount (us$ m)"			DOUBLE PRECISION, 
	"link_data source id (deal size - source)"			INTEGER, 
	"equity stake (by pe firm only)"			DOUBLE PRECISION, 
	"equity stake (by all co-investors)"			DOUBLE PRECISION, 
	"link_data source id (equity stake - source)"			INTEGER, 
	"(old 20130227) equity stake"			VARCHAR (255), 
	"mezzanine info_mezz debt type (buyouts leveraged loan)"			BOOLEAN NOT NULL, 
	"mezzanine info_mezz debt type (recap/refin)"			BOOLEAN NOT NULL, 
	"mezzanine info_mezz debt type (growth)"			BOOLEAN NOT NULL, 
	"mezzanine info_mezz debt type (acquisition loan)"			BOOLEAN NOT NULL, 
	"mezzanine info_mezz debt type (others)"			BOOLEAN NOT NULL, 
	"mezzanine info_mezz financier type (mezz affiliates of bank)"			BOOLEAN NOT NULL, 
	"mezzanine info_mezz financier type (fund management firm)"			BOOLEAN NOT NULL, 
	"link_credit finance type id"			INTEGER, 
	"credit finance_credit format (mezzanine)"			BOOLEAN NOT NULL, 
	"credit finance_credit format (junior loan)"			BOOLEAN NOT NULL, 
	"credit finance_credit format (senior loan)"			BOOLEAN NOT NULL, 
	"credit finance_credit format (abs (asset backed securities))"			BOOLEAN NOT NULL, 
	"leverage ratio"			DOUBLE PRECISION, 
	"(temp backup 20130227) leverage ratio"			VARCHAR (50), 
	"valuation-enterprise value (us$ m)"			VARCHAR (255), 
	"valuation-equity value (us$m)"			VARCHAR (255), 
	"(old 20131030) valuation - before adding equity value (oct 2006)"			VARCHAR (50), 
	"(old 20131030) valuation-ratio 1) revenue"			VARCHAR (255), 
	"(old 20131030) valuation-ratio 2) ebitda"			VARCHAR (255), 
	"(old 20131030) valuation-ratio 3) ebit"			VARCHAR (255), 
	"(old 20131030)valuation-ratio 4or5) netprofitaftertaxor p/eratio"			VARCHAR (255), 
	"(old 20131030valua-ratio4or5) remarksnetprofitaftertaxorp/eratio"			VARCHAR (50), 
	"(old 20131030) valuation-ratio 5) p/e ratio"			VARCHAR (50), 
	"(old 20131030) valuation-ratio 6) book value"			VARCHAR (255), 
	"(old 20110803) stage of investment"			VARCHAR (255), 
	"link_stage of invest id"			INTEGER NOT NULL, 
	"link_deal nature id"			INTEGER NOT NULL, 
	"(old 20120227) deal nature"			VARCHAR (50), 
	"round of financing"			VARCHAR (50), 
	"pipe investment?"			BOOLEAN NOT NULL, 
	"privatisation (of listed company)"			BOOLEAN NOT NULL, 
	"(old 20131007) debt investment?"			VARCHAR (50), 
	"debt investment"			BOOLEAN NOT NULL, 
	"invest by real estate fund or invest arm (pe)"			BOOLEAN NOT NULL, 
	"invest by real estate fund or invest arm (institutional invest)"			BOOLEAN NOT NULL, 
	"invest by revenue based financing fund"			BOOLEAN NOT NULL, 
	"cross-border deal?"			BOOLEAN NOT NULL, 
	"intra-regional deal"			BOOLEAN NOT NULL, 
	"secondary?"			BOOLEAN NOT NULL, 
	"cornerstone investor (at ipo)"			BOOLEAN NOT NULL, 
	"pre-ipo?"			BOOLEAN NOT NULL, 
	"has board seat (for ii investment only)?"			BOOLEAN NOT NULL, 
	"link_tech deal category id"			INTEGER, 
	"whether exit"			VARCHAR (50), 
	"link_exit status id (displayed exit status)"			INTEGER, 
	"name of acquirer"			VARCHAR (100), 
	"date exit"			VARCHAR (50), 
	"(old 20110803) do not disclose-investor name"			BOOLEAN NOT NULL, 
	"(old 20110803) do not disclose-deal size"			BOOLEAN NOT NULL, 
	"(old 20110803) do not disclose-equity stake"			BOOLEAN NOT NULL, 
	"(delete 20110803) do not disclose-pe portion"			BOOLEAN NOT NULL, 
	"type of investor"			TEXT, 
	"local"			BOOLEAN NOT NULL, 
	"asia"			BOOLEAN NOT NULL, 
	"foreign"			BOOLEAN NOT NULL, 
	"investor profile type_cross-border"			BOOLEAN NOT NULL, 
	"joint-venture"			BOOLEAN NOT NULL, 
	"investor profile type_other"			BOOLEAN NOT NULL, 
	"createdby_investee_invest_round"			VARCHAR (255), 
	"date entered (investment detail)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_investdetail"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_investdetail"			VARCHAR (255), 
	"db source (20110421)"			VARCHAR (50), 
	"(old) temp copy of valuation 4 or 5 remarks"			VARCHAR (50), 
	"(old 20110421) it related?"			BOOLEAN NOT NULL, 
	"(old 20110421) infrastructure deal?"			BOOLEAN NOT NULL, 
	"(old 20130227)temp equity stake to be imported"			DOUBLE PRECISION, 
	"link_year id (fail year)"			INTEGER, 
	"link_month id (fail month)"			INTEGER, 
	"link_fail reason id (fail deal reason)"			INTEGER, 
	"link_data source id (fail deal - source)"			INTEGER, 
	"existing investor name to be split"			TIMESTAMP WITHOUT TIME ZONE, 
	"investor name split completion date"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "2nd deal for a company"."id" IS 'Must be Corresponding to Company';
COMMENT ON COLUMN "2nd deal for a company"."include in calculation in databank (pe firm invest) (paid member" IS 'This field will be updated in Excel directly each time';
COMMENT ON COLUMN "2nd deal for a company"."include in calculation in databank (pe firm invest) (trial vers" IS 'This field will be updated in MsAccess';
COMMENT ON COLUMN "2nd deal for a company"."show this deal in databank (pe firm invest) (trial version)" IS 'This field will be updated in MsAccess';
COMMENT ON COLUMN "2nd deal for a company"."link_year id_deal_disclose_year" IS '2023-06-20 Added Disclosure Date.';
COMMENT ON COLUMN "2nd deal for a company"."link_month id_deal_disclose_month" IS '2023-06-20 Added Disclosure Date.';
COMMENT ON COLUMN "2nd deal for a company"."link_data source id_deal_disclose_date" IS '2023-06-20 Added Disclosure Date.';
COMMENT ON COLUMN "2nd deal for a company"."expected_deal_complete_date_begin" IS '2023-06-20 Added Deal Expected completion date.  Only neeed to enter End Date if known.  Enter both Begin Date and End Date if it is a Date Range (eg, Quarter)';
COMMENT ON COLUMN "2nd deal for a company"."expected_deal_complete_date_end" IS '2023-06-20 Added Deal Expected completion date.  Only neeed to enter End Date if known.  Enter both Begin Date and End Date if it is a Date Range (eg, Quarter)';
COMMENT ON COLUMN "2nd deal for a company"."link_data source id_deal_expected_complete_date" IS '2023-06-20 Added Deal Expected completion date.';
COMMENT ON COLUMN "2nd deal for a company"."link_year id (invest year)" IS '2023-06-20 Added Disclosure Date.  The definition of Invest Year becomes equilvalent to Deal Completion Date';
COMMENT ON COLUMN "2nd deal for a company"."link_month id (invest month)" IS '2023-06-20 Added Disclosure Date.  The definition of Invest Year becomes equilvalent to Deal Completion Date';
COMMENT ON COLUMN "2nd deal for a company"."link_data source id (deal info - source)" IS '2023-06-20 Added Disclosure Date.  This source is more for Completion Date.  This deal info source refer to the deal, investor and investment date.  But exclude transaction amount and equity stake.';
COMMENT ON COLUMN "2nd deal for a company"."link_country id (investee location at investment date)" IS 'This field added in Dec 2015. This field will be entered if the investee location at the time of receiving funding is different from the investee existing location.  Eg, the investee has moved headquarter after received investment from investors.';
COMMENT ON COLUMN "2nd deal for a company"."link_fundingrd_cat_prefix_id_investrd" IS '2023-06-20 Added.';
COMMENT ON COLUMN "2nd deal for a company"."link_fundingrd_cat_main_id_investrd" IS '2023-06-20 Added.';
COMMENT ON COLUMN "2nd deal for a company"."link_fundingrd_cat_suffix_1_id_investrd" IS '2023-06-20 Added.';
COMMENT ON COLUMN "2nd deal for a company"."link_fundingrd_cat_suffix_2_id_investrd" IS '2023-06-20 Added.';
COMMENT ON COLUMN "2nd deal for a company"."displayed investor name verification status (20110801)" IS 'To check the existing displayed investor name in DB before 1 Aug 2011 for coming Databank.  (Last ID 14850)';
COMMENT ON COLUMN "2nd deal for a company"."credit investor_pe" IS 'Credit Investor';
COMMENT ON COLUMN "2nd deal for a company"."credit investor_corporate venture" IS 'Credit Investor';
COMMENT ON COLUMN "2nd deal for a company"."credit investor_institutional investor" IS 'Credit Investor';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz debt type (buyouts leveraged loan)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz debt type (recap/refin)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz debt type (growth)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz debt type (acquisition loan)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz debt type (others)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz financier type (mezz affiliates of bank)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."mezzanine info_mezz financier type (fund management firm)" IS 'Mezzanine Section';
COMMENT ON COLUMN "2nd deal for a company"."credit finance_credit format (mezzanine)" IS 'Credit Finance Section - Credit Format';
COMMENT ON COLUMN "2nd deal for a company"."credit finance_credit format (junior loan)" IS 'Credit Finance Section - Credit Format';
COMMENT ON COLUMN "2nd deal for a company"."credit finance_credit format (senior loan)" IS 'Credit Finance Section - Credit Format';
COMMENT ON COLUMN "2nd deal for a company"."credit finance_credit format (abs (asset backed securities))" IS 'Credit Finance Section - Credit Format';
COMMENT ON COLUMN "2nd deal for a company"."(old 20131030) valuation-ratio 1) revenue" IS 'Valuation-Ratio (Historical P/R)';
COMMENT ON COLUMN "2nd deal for a company"."(old 20131030) valuation-ratio 2) ebitda" IS 'Valuation-Ratio (Historical EV/EBITDA ratio)';
COMMENT ON COLUMN "2nd deal for a company"."(old 20131030) valuation-ratio 3) ebit" IS 'Valuation-Ratio (Historical Price per EBIT ratio)';
COMMENT ON COLUMN "2nd deal for a company"."(old 20131030)valuation-ratio 4or5) netprofitaftertaxor p/eratio" IS 'Historical P/E Ratio';
COMMENT ON COLUMN "2nd deal for a company"."(old 20131030valua-ratio4or5) remarksnetprofitaftertaxorp/eratio" IS 'Remarks for Historical P/E Ratio';
COMMENT ON COLUMN "2nd deal for a company"."(old 20131030) valuation-ratio 6) book value" IS 'Valuation-Ratio (P/BV)';
COMMENT ON COLUMN "2nd deal for a company"."link_deal nature id" IS 'Has the item "Control" and "Minority" before 4 Oct 2012.  Item "Co-control" is added on 4 Oct 2012.';
COMMENT ON COLUMN "2nd deal for a company"."(old 20120227) deal nature" IS 'Has the item "Control" and "Minority" before 4 Oct 2012.  Item "Co-control" is added on 4 Oct 2012.';
COMMENT ON COLUMN "2nd deal for a company"."privatisation (of listed company)" IS 'This field was added in June 2011';
COMMENT ON COLUMN "2nd deal for a company"."debt investment" IS 'This debt investment is classified as Non-PE deal';
COMMENT ON COLUMN "2nd deal for a company"."cross-border deal?" IS 'Investment in Non-Asia based Investee';
COMMENT ON COLUMN "2nd deal for a company"."intra-regional deal" IS 'Asia PE funds investing in Asian countries other than its fund main geographic focus';
COMMENT ON COLUMN "2nd deal for a company"."cornerstone investor (at ipo)" IS 'This field was added in November 2011';
COMMENT ON COLUMN "2nd deal for a company"."link_tech deal category id" IS 'This field added in 2015-12.  Criteria 2014-12: 1) Early stage deal in IT/ internet relate, or 2) Non-Early stage deal in IT/internet relate that establish <=3 yrs, or 3) All eCommerce firms in all invest stage.  (Note:Invest Yr - Investee Found Yr+1 Yr)';
COMMENT ON COLUMN "2nd deal for a company"."local" IS 'Investor Profile';
COMMENT ON COLUMN "2nd deal for a company"."asia" IS 'Investor Profile';
COMMENT ON COLUMN "2nd deal for a company"."foreign" IS 'Investor Profile';
COMMENT ON COLUMN "2nd deal for a company"."investor profile type_cross-border" IS 'Investor Profile.  This field was added in Aug 2018.   This is to indicate cross-border Investors';
COMMENT ON COLUMN "2nd deal for a company"."joint-venture" IS 'Investor Profile';
COMMENT ON COLUMN "2nd deal for a company"."investor profile type_other" IS 'Investor Profile.  This field was added in Dec 2015';
COMMENT ON COLUMN "2nd deal for a company"."lastmodified_investdetail" IS 'Those date before 21 Apr 2011 (ie, the date before the merger of main round and 2nd round of investment)may rather to other investment round in the investee rather than this round.';

-- CREATE INDEXES ...
CREATE INDEX "2nd deal for a company_2nd deal for a company2nd deal id_idx" ON "2nd deal for a company" ("2nd deal id");
CREATE INDEX "2nd deal for a company_link_deal size type id_idx" ON "2nd deal for a company" ("link_deal size type id");
CREATE INDEX "2nd deal for a company_link_valuation record id_idx" ON "2nd deal for a company" ("link_valuation record id");

CREATE TABLE IF NOT EXISTS "auxilliary service providers"
 (
	"id_auxservprovider"			SERIAL, 
	"2nd deal id"			INTEGER, 
	"name of auxilliary service provider"			VARCHAR (255), 
	"link_country id (auxservprovider location)"			INTEGER NOT NULL, 
	"link_auxservprovider nature id"			INTEGER NOT NULL, 
	"appointer"			VARCHAR (255) NOT NULL, 
	"remarks (auxilliary service provider)"			VARCHAR (255), 
	"date entered (auxilliary service provider)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_auxilliaryserviceprovider"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_auxilliaryserviceprovider"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "auxilliary service providers_2nd deal id_idx" ON "auxilliary service providers" ("2nd deal id");
CREATE INDEX "auxilliary service providers_link_auxservprovider nature id_idx" ON "auxilliary service providers" ("link_auxservprovider nature id");
ALTER TABLE "auxilliary service providers" ADD CONSTRAINT "auxilliary service providers_pkey" PRIMARY KEY ("id_auxservprovider");

CREATE TABLE IF NOT EXISTS "company"
 (
	"id"			SERIAL, 
	"identification"			VARCHAR (255), 
	"company"			VARCHAR (255), 
	"company (chinese)"			VARCHAR (50), 
	"displayed investee name (english)"			TEXT, 
	"link investor id (investee for investeercd)"			INTEGER, 
	"displayed investee name verification status (20110801)"			VARCHAR (255), 
	"address 1"			VARCHAR (255), 
	"address 2"			VARCHAR (255), 
	"city"			VARCHAR (255), 
	"state / province"			VARCHAR (255), 
	"zip / postal code"			VARCHAR (255), 
	"(old 20110803) country"			VARCHAR (255), 
	"link_country id (investee location)"			INTEGER NOT NULL, 
	"registered address"			VARCHAR (255), 
	"address (in local language exclude english)"			TEXT, 
	"e-mail address"			VARCHAR (255), 
	"web site"			VARCHAR (255), 
	"tel1_country_code"			VARCHAR (255), 
	"tel1"			VARCHAR (255), 
	"fax1_country_code"			VARCHAR (255), 
	"fax1"			VARCHAR (255), 
	"listing status"			VARCHAR (255), 
	"stock code"			VARCHAR (255), 
	"listed stock exchange"			VARCHAR (50), 
	"listed country"			VARCHAR (50), 
	"listed date"			VARCHAR (50), 
	"delisted"			BOOLEAN NOT NULL, 
	"delisted date"			VARCHAR (50), 
	"link_industry id"			INTEGER NOT NULL, 
	"link_tech_cate_id_investee"			INTEGER, 
	"link_artificial_intelligence_cate_id_investee"			INTEGER, 
	"link_semiconductor_cate_id_investee"			INTEGER, 
	"link_battery_cate_id_investee"			INTEGER, 
	"link_electric_vehicle_cate_id_investee"			INTEGER, 
	"link_real_asset_cate_id_investee"			INTEGER, 
	"link_healthcare_cate_id_investee"			INTEGER, 
	"link_sri focus id"			INTEGER, 
	"remarks"			TEXT, 
	"link_year id (investee established year)"			INTEGER, 
	"link_month id (investee established month)"			INTEGER, 
	"background"			TEXT, 
	"aper-include in stock watch?"			BOOLEAN NOT NULL, 
	"controlling stake?"			BOOLEAN NOT NULL, 
	"internet related?"			BOOLEAN NOT NULL, 
	"ecommerce"			BOOLEAN NOT NULL, 
	"(old 20111122) internet related"			BOOLEAN NOT NULL, 
	"infrastructure deal?"			BOOLEAN NOT NULL, 
	"(old 20111122) infrastructure deal"			BOOLEAN NOT NULL, 
	"filing section"			VARCHAR (15), 
	"first day closing price"			VARCHAR (50), 
	"aper-include in stock watch"			VARCHAR (50), 
	"document scanning date"			TIMESTAMP WITHOUT TIME ZONE, 
	"date entered_firm"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_firm"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_firm"			VARCHAR (255), 
	"(old moved 20110421) real estate deal?"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "company"."displayed investee name verification status (20110801)" IS 'To check the existing displayed investee name in DB before 1 Aug 2011 for coming Databank.  (Last ID 6813)';
COMMENT ON COLUMN "company"."address (in local language exclude english)" IS 'This is to record the non-English postal address';
COMMENT ON COLUMN "company"."link_tech_cate_id_investee" IS 'This field added in 2015-12.  Criteria 2014-12: 1) Early stage deal in IT/ internet relate, or 2) Non-Early stage deal in IT/internet relate that establish <=3 yrs, or 3) All eCommerce firms in all invest stage.  (Note:Invest Yr - Investee Found Yr+1 Yr)';
COMMENT ON COLUMN "company"."ecommerce" IS 'The ecommerce field is added into this database on 2 Feb 2015.  Have quickly reclassified those companies that received PE investment from 2010 to 2014.';
COMMENT ON COLUMN "company"."document scanning date" IS 'The date the dead file is being scanned to electronic version.';
COMMENT ON COLUMN "company"."lastmodified_firm" IS 'Last update of company information';

-- CREATE INDEXES ...
CREATE INDEX "company_link_ii country_id_idx" ON "company" ("link_industry id");
CREATE INDEX "company_link_industry id_idx" ON "company" ("link_country id (investee location)");
CREATE INDEX "company_link_sri focus id_idx" ON "company" ("link_sri focus id");

CREATE TABLE IF NOT EXISTS "contact"
 (
	"id"			INTEGER NOT NULL, 
	"id_contact person"			SERIAL, 
	"identification"			VARCHAR (255), 
	"company"			VARCHAR (255), 
	"mr/ms"			VARCHAR (255), 
	"first name"			VARCHAR (255), 
	"initial"			VARCHAR (255), 
	"last name"			VARCHAR (255), 
	"email_personal"			VARCHAR (50), 
	"(chinese) first name"			VARCHAR (50), 
	"(chinese) last name"			VARCHAR (50), 
	"(chinese) position"			VARCHAR (50), 
	"mobile_phone"			VARCHAR (50), 
	"marketing"			VARCHAR (50), 
	"position"			VARCHAR (255), 
	"date entered_contact"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_contact"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_contact"			VARCHAR (255)
);
COMMENT ON COLUMN "contact"."id" IS 'Must be Corresponding to Company';

-- CREATE INDEXES ...
CREATE INDEX "contact_contactid_idx" ON "contact" ("id");
CREATE UNIQUE INDEX "contact_id_contact person_idx" ON "contact" ("id_contact person");

CREATE TABLE IF NOT EXISTS "data log"
 (
	"f1"			VARCHAR (255)
);

-- CREATE INDEXES ...

CREATE TABLE IF NOT EXISTS "event_checkinfo"
 (
	"id_event_checkinfo"			SERIAL, 
	"date_verify"			TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"link to staff id_checker"			INTEGER NOT NULL, 
	"remark_by_checker"			TEXT, 
	"link to investor id_firm"			INTEGER, 
	"link to investee id"			INTEGER, 
	"link to investrd id"			INTEGER, 
	"link to fund id"			VARCHAR (50), 
	"link to fundrd id"			INTEGER, 
	"link to divest id"			INTEGER, 
	"link to valuation id"			INTEGER, 
	"date entered_checkinfo"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_checkinfo"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_checkinfo"			VARCHAR (255)
);
COMMENT ON COLUMN "event_checkinfo"."date_verify" IS 'date when Checker verify the info.  This date is automatic generated by default but can be changed';
COMMENT ON COLUMN "event_checkinfo"."link to investee id" IS 'Do not use this field.  Update Firm (Investor ID) directly';

-- CREATE INDEXES ...
CREATE INDEX "event_checkinfo_link to fund id_idx" ON "event_checkinfo" ("link to fund id");
CREATE INDEX "event_checkinfo_link to fundrd id_idx" ON "event_checkinfo" ("link to fundrd id");
CREATE INDEX "event_checkinfo_link to fundrd id1_idx" ON "event_checkinfo" ("link to divest id");
CREATE INDEX "event_checkinfo_link to investee id_idx" ON "event_checkinfo" ("link to investee id");
CREATE INDEX "event_checkinfo_link to investrd id_idx" ON "event_checkinfo" ("link to investrd id");
CREATE INDEX "event_checkinfo_link to investrd id1_idx" ON "event_checkinfo" ("link to valuation id");
CREATE INDEX "event_checkinfo_link to investrd id2_idx" ON "event_checkinfo" ("link to investor id_firm");
CREATE INDEX "event_checkinfo_link to library record id_idx" ON "event_checkinfo" ("link to staff id_checker");
ALTER TABLE "event_checkinfo" ADD CONSTRAINT "event_checkinfo_pkey" PRIMARY KEY ("id_event_checkinfo");

CREATE TABLE IF NOT EXISTS "financier financing info"
 (
	"id_financier financing record"			SERIAL, 
	"link_valuation record id"			INTEGER NOT NULL, 
	"link_financier id (financier for valuation)"			INTEGER, 
	"remarks (financier financing record)"			VARCHAR (255), 
	"lead arranger"			BOOLEAN NOT NULL, 
	"type of loan provided"			VARCHAR (255), 
	"loan amount provided (us$ m)"			DOUBLE PRECISION, 
	"date entered (financier financing record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_financierfinancingrecord"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_financierfinancingrecord"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "financier financing info_2nd deal id_idx" ON "financier financing info" ("link_valuation record id");
ALTER TABLE "financier financing info" ADD CONSTRAINT "financier financing info_pkey" PRIMARY KEY ("id_financier financing record");

CREATE TABLE IF NOT EXISTS "financier name"
 (
	"id_financier_name"			SERIAL, 
	"link_latest_financier_name_group id"			INTEGER, 
	"financier name (english)"			VARCHAR (255), 
	"financier name (chinese)"			VARCHAR (255), 
	"link_country id (financier headquarter location)"			INTEGER, 
	"financier name status"			VARCHAR (255), 
	"date entered (financier name)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_financiername"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_financiername"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "financier name_link_latest_name_group id_idx" ON "financier name" ("link_latest_financier_name_group id");
ALTER TABLE "financier name" ADD CONSTRAINT "financier name_pkey" PRIMARY KEY ("id_financier_name");

CREATE TABLE IF NOT EXISTS "financier name (latest name group) (not used)"
 (
	"id_latest_financier_name_group"			SERIAL, 
	"financier name (english) (latest)"			VARCHAR (255), 
	"financier name (chinese) (latest)"			VARCHAR (255), 
	"link_country id (financier group headquarter location)"			INTEGER, 
	"website (latest financier name)"			VARCHAR (255), 
	"date entered (latest financier group name)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_latestfinanciergroupname"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_latestfinanciergroupname"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "financier name (latest name group) (not used)" ADD CONSTRAINT "financier name (latest name group) (not used)_pkey" PRIMARY KEY ("id_latest_financier_name_group");

CREATE TABLE IF NOT EXISTS "firm_affiliate"
 (
	"id_firm_affiliate"			SERIAL, 
	"link_investor_name_id_fa"			INTEGER, 
	"date_begin_fa"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_fa"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_firmaffil_id"			INTEGER, 
	"remarks_fa"			TEXT, 
	"date entered_fa"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fa"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fa"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "firm_affiliate_link_latest_name_group id_idx" ON "firm_affiliate" ("link_investor_name_id_fa");
ALTER TABLE "firm_affiliate" ADD CONSTRAINT "firm_affiliate_pkey" PRIMARY KEY ("id_firm_affiliate");

CREATE TABLE IF NOT EXISTS "firm_cate"
 (
	"id_firm_category"			SERIAL, 
	"link_investor_name_id_fc"			INTEGER, 
	"date_begin_fc"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_fc"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_firmcate_id"			INTEGER, 
	"remarks_fc"			TEXT, 
	"date entered_fc"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fc"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fc"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "firm_cate_link_latest_name_group id_idx" ON "firm_cate" ("link_investor_name_id_fc");
ALTER TABLE "firm_cate" ADD CONSTRAINT "firm_cate_pkey" PRIMARY KEY ("id_firm_category");

CREATE TABLE IF NOT EXISTS "firm_investfocus"
 (
	"id_firminvestfocus"			SERIAL, 
	"link_investor_name_id_finvfoc"			INTEGER, 
	"date_begin_finvfoc"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_finvfoc"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_finvfoc_id"			INTEGER, 
	"remarks_finvfoc"			TEXT, 
	"date entered_finvfoc"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_finvfoc"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_finvfoc"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "firm_investfocus_link_latest_name_group id_idx" ON "firm_investfocus" ("link_investor_name_id_finvfoc");
ALTER TABLE "firm_investfocus" ADD CONSTRAINT "firm_investfocus_pkey" PRIMARY KEY ("id_firminvestfocus");

CREATE TABLE IF NOT EXISTS "firm_location"
 (
	"id_firm_location"			SERIAL, 
	"link_investor_name_id_floc"			INTEGER, 
	"date_begin_floc"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_floc"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_firmloc_id"			INTEGER, 
	"link_note_item_id_firm_locat_note"			INTEGER, 
	"link_data source id (firm loca - source)"			INTEGER, 
	"remarks_floc"			TEXT, 
	"date entered_floc"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_floc"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_floc"			VARCHAR (255), 
	"x link_geo_focus_type id"			INTEGER, 
	"x link_investor_profile_sc_type id"			INTEGER
);

-- CREATE INDEXES ...
CREATE INDEX "firm_location_link_latest_name_group id_idx" ON "firm_location" ("link_investor_name_id_floc");
ALTER TABLE "firm_location" ADD CONSTRAINT "firm_location_pkey" PRIMARY KEY ("id_firm_location");

CREATE TABLE IF NOT EXISTS "fund invest in deal"
 (
	"id_fund invest in deal"			SERIAL, 
	"2nd deal id"			INTEGER, 
	"investor name"			VARCHAR (255), 
	"fund name"			VARCHAR (255), 
	"link_data source id (fund invest info - source)"			INTEGER, 
	"remarks (fund invest in deal)"			VARCHAR (255), 
	"date entered (fund invest in deal)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fund invest in deal"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fund invest in deal"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "fund invest in deal_2nd deal id_idx" ON "fund invest in deal" ("2nd deal id");
CREATE INDEX "fund invest in deal_id_fund invest in deal_idx" ON "fund invest in deal" ("id_fund invest in deal");
ALTER TABLE "fund invest in deal" ADD CONSTRAINT "fund invest in deal_pkey" PRIMARY KEY ("id_fund invest in deal");

CREATE TABLE IF NOT EXISTS "info_other_cate"
 (
	"id_info_other_cate"			SERIAL, 
	"link_investee_id"			INTEGER, 
	"link_info_othercateitemid"			INTEGER, 
	"date_begin_othercate"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_othercate"			TIMESTAMP WITHOUT TIME ZONE, 
	"remarks_othercate"			TEXT, 
	"date entered_othercate"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_othercate"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_othercate"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "info_other_cate_link_latest_name_group id_idx" ON "info_other_cate" ("link_investee_id");
ALTER TABLE "info_other_cate" ADD CONSTRAINT "info_other_cate_pkey" PRIMARY KEY ("id_info_other_cate");

CREATE TABLE IF NOT EXISTS "investor geo focus type"
 (
	"id_investor_geo focus type"			SERIAL, 
	"link_investor_name_id"			INTEGER, 
	"date_begin_geo focus type"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_geo focus type"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_geo focus type id"			INTEGER, 
	"remarks_investor geo focus type"			TEXT, 
	"date entered_geo focus type)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_geo focus type"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_geo focus type"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "investor geo focus type_link_latest_name_group id_idx" ON "investor geo focus type" ("link_investor_name_id");
ALTER TABLE "investor geo focus type" ADD CONSTRAINT "investor geo focus type_pkey" PRIMARY KEY ("id_investor_geo focus type");

CREATE TABLE IF NOT EXISTS "investor invest company (valuation)"
 (
	"id_investor invest company (valuation)"			SERIAL, 
	"link_valuation record id"			INTEGER NOT NULL, 
	"link_investor id (investor for calculation of valuation)"			INTEGER, 
	"fund name"			VARCHAR (255), 
	"link_fund geo focus (fund geo focus for valuation)"			INTEGER, 
	"link_fund category id (fund category for valuation)"			INTEGER, 
	"invest through rmb fund"			BOOLEAN NOT NULL, 
	"facilitate cross-border investment"			BOOLEAN NOT NULL, 
	"date entered (investorinvestcompany_valuation)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_investorinvestcompany_valuation"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_investorinvestcompany_valuation"			VARCHAR (255)
);
COMMENT ON COLUMN "investor invest company (valuation)"."fund name" IS 'Deal Details';
COMMENT ON COLUMN "investor invest company (valuation)"."link_fund geo focus (fund geo focus for valuation)" IS 'Deal Details';
COMMENT ON COLUMN "investor invest company (valuation)"."link_fund category id (fund category for valuation)" IS 'Deal Details';
COMMENT ON COLUMN "investor invest company (valuation)"."invest through rmb fund" IS 'Deal Details';
COMMENT ON COLUMN "investor invest company (valuation)"."facilitate cross-border investment" IS 'Deal Details.  This is based on the Fund being used to invest rather than Investment Firm manadate';

-- CREATE INDEXES ...
CREATE INDEX "investor invest company (valuation)_link_valuation record id_idx" ON "investor invest company (valuation)" ("link_valuation record id");
ALTER TABLE "investor invest company (valuation)" ADD CONSTRAINT "investor invest company (valuation)_pkey" PRIMARY KEY ("id_investor invest company (valuation)");

CREATE TABLE IF NOT EXISTS "investor invest round"
 (
	"id_investorrd"			SERIAL, 
	"link_investment round id"			INTEGER NOT NULL, 
	"link investor id (investor for investorrd)"			INTEGER, 
	"investor name quote from original source"			TEXT, 
	"link_source id (investor name - investorrd source)"			INTEGER, 
	"lead investor"			BOOLEAN NOT NULL, 
	"link_dealcountpecate id"			INTEGER, 
	"link_investor profile id"			INTEGER, 
	"link_year id (date announce_investorrd)"			INTEGER, 
	"link_month id (date announce_investorrd)"			INTEGER, 
	"link_source id (date announce - investorrd source)"			INTEGER, 
	"link_year id (date invest_execute_investorrd)"			INTEGER, 
	"link_month id (date invest_execute_investorrd)"			INTEGER, 
	"link_source id (date execute - investorrd source)"			INTEGER, 
	"link fund id (investorrd)"			INTEGER, 
	"vehicle name quote from original source"			TEXT, 
	"link_source id (fund involved - investorrd source)"			INTEGER, 
	"link_country id (investfunddenomination)"			INTEGER, 
	"invest amt_deal_size_usd_m"			DOUBLE PRECISION, 
	"link_country id (lc code deal size investorrd)"			INTEGER, 
	"invest amt_deal_size_lc_m"			DOUBLE PRECISION, 
	"link_sourceid (invamt deal size - investorrd source)"			INTEGER, 
	"invest amt_equity_usd_m"			DOUBLE PRECISION, 
	"link_country id (lc code_equity investorrd)"			INTEGER, 
	"invest amt_equity_lc_m"			DOUBLE PRECISION, 
	"link_sourceid (invamt equity - investorrd source)"			INTEGER, 
	"invest amt_debt_usd_m"			DOUBLE PRECISION, 
	"link_country id (lc code_debt investorrd)"			INTEGER, 
	"invest amt_debt_lc_m"			DOUBLE PRECISION, 
	"link_sourceid (invamt debt - investorrd source)"			INTEGER, 
	"credit investment"			BOOLEAN NOT NULL, 
	"invest amt_credit fin_usd_m"			DOUBLE PRECISION, 
	"link_country id (lc code credit fin investorrd)"			INTEGER, 
	"invest amt_credit fin_lc_m"			DOUBLE PRECISION, 
	"link_sourceid (invamt credit fin - investorrd source)"			INTEGER, 
	"equity stake (investorrd)"			DOUBLE PRECISION, 
	"link_ source id (equity stake - investorrd source)"			INTEGER, 
	"pipe"			BOOLEAN NOT NULL, 
	"pre-ipo"			BOOLEAN NOT NULL, 
	"cornerstone investor (at ipo)"			BOOLEAN NOT NULL, 
	"secondary"			BOOLEAN NOT NULL, 
	"cross-border deal"			BOOLEAN NOT NULL, 
	"intra-regional deal"			BOOLEAN NOT NULL, 
	"invest by real estate fund or investment arm"			BOOLEAN NOT NULL, 
	"remarks_investorrd"			TEXT, 
	"temp reference"			TEXT, 
	"date entered_investorrd"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_investorrd"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_investorrd"			VARCHAR (255), 
	"f48"			VARCHAR (255)
);
COMMENT ON COLUMN "investor invest round"."cross-border deal" IS 'Asian Fund invest in Non-Asia investee';
COMMENT ON COLUMN "investor invest round"."intra-regional deal" IS 'Asian Fund invest in Asian countries other than its fund main geo focus';

-- CREATE INDEXES ...
CREATE INDEX "investor invest round_link_investment round id_idx" ON "investor invest round" ("link_investment round id");
ALTER TABLE "investor invest round" ADD CONSTRAINT "investor invest round_pkey" PRIMARY KEY ("id_investorrd");

CREATE TABLE IF NOT EXISTS "investor name"
 (
	"id_investor_name"			SERIAL, 
	"link_latest_investor_name_group id"			INTEGER, 
	"investor name (english)"			VARCHAR (255) NOT NULL, 
	"investor legal name (english)"			VARCHAR (255) NOT NULL, 
	"display investor name (english)"			VARCHAR (255) NOT NULL, 
	"investor name (chinese)"			VARCHAR (255), 
	"link_country_id_firm_country_origin"			INTEGER, 
	"link_country id (investor location)"			INTEGER, 
	"link_note_item_id_firm_name_note"			INTEGER, 
	"link_investor type id (investor type)"			INTEGER, 
	"link_yes_no (investee)"			INTEGER, 
	"website"			VARCHAR (255), 
	"investor name status"			VARCHAR (255), 
	"link_investor name (latest name)"			INTEGER, 
	"backing company name"			VARCHAR (255), 
	"link_investor name (subsidiary of)"			INTEGER, 
	"individual investor_job title and firm name"			TEXT, 
	"individual investor_first name"			VARCHAR (255), 
	"individual investor_last name"			VARCHAR (255), 
	"remarks_investor name"			TEXT, 
	"date entered (investor name)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_investorname"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_investorname"			VARCHAR (255), 
	"hl checked"			TIMESTAMP WITHOUT TIME ZONE, 
	"temp id"			INTEGER, 
	"date import from deal sheet temp"			TIMESTAMP WITHOUT TIME ZONE, 
	"temp import name id"			VARCHAR (255)
);
COMMENT ON COLUMN "investor name"."investor legal name (english)" IS 'Name in Long form';
COMMENT ON COLUMN "investor name"."display investor name (english)" IS 'Display name of investor on Caper publication';
COMMENT ON COLUMN "investor name"."link_country_id_firm_country_origin" IS 'Origin country is required if Parent Location differ from Origin; multiple parent location in Investor Profile.  Eg,company migration to different country, parent company change resulting from M&A;JV that setup by investors from different countries';
COMMENT ON COLUMN "investor name"."link_country id (investor location)" IS 'This field is not used in around year 2022 as firm may move its location to other country';
COMMENT ON COLUMN "investor name"."temp import name id" IS 'Year 2012 import';

-- CREATE INDEXES ...
CREATE INDEX "investor name_link_latest_name_group id_idx" ON "investor name" ("link_latest_investor_name_group id");
ALTER TABLE "investor name" ADD CONSTRAINT "investor name_pkey" PRIMARY KEY ("id_investor_name");
CREATE INDEX "investor name_temp id_idx" ON "investor name" ("temp id");
CREATE INDEX "investor name_temp import name id_idx" ON "investor name" ("temp import name id");

CREATE TABLE IF NOT EXISTS "investor name (latest name group)"
 (
	"id_latest_investor_name_group"			SERIAL, 
	"investor name (english) (latest)"			VARCHAR (255), 
	"investor legal name (english) (latest)"			VARCHAR (255), 
	"investor name (chinese) (latest)"			VARCHAR (255), 
	"link_country id (investor headquarter location)"			INTEGER, 
	"website (latest investor name)"			VARCHAR (255), 
	"date entered (latest investor group name)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_latestinvestorgroupname"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_latestinvestorgroupname"			VARCHAR (255), 
	"temp id"			VARCHAR (255), 
	"temp2 type of investor"			VARCHAR (255), 
	"temp company backer"			VARCHAR (255), 
	"temp investor name status"			VARCHAR (255)
);
COMMENT ON COLUMN "investor name (latest name group)"."investor legal name (english) (latest)" IS 'Name in long form';

-- CREATE INDEXES ...
ALTER TABLE "investor name (latest name group)" ADD CONSTRAINT "investor name (latest name group)_pkey" PRIMARY KEY ("id_latest_investor_name_group");
CREATE INDEX "investor name (latest name group)_temp id_idx" ON "investor name (latest name group)" ("temp id");

CREATE TABLE IF NOT EXISTS "investor_profile"
 (
	"id_investor_profile"			SERIAL, 
	"link_investor_name_ip"			INTEGER, 
	"date_begin_ip"			TIMESTAMP WITHOUT TIME ZONE, 
	"date_end_ip"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_countr_ id_parent"			INTEGER NOT NULL, 
	"link_geo_focus_type id"			INTEGER NOT NULL, 
	"link_investor_profile_sc_type id"			INTEGER, 
	"remarks_ip_type"			TEXT, 
	"date entered_ip"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_ip"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ip"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "investor_profile_link_latest_name_group id_idx" ON "investor_profile" ("link_investor_name_ip");
ALTER TABLE "investor_profile" ADD CONSTRAINT "investor_profile_pkey" PRIMARY KEY ("id_investor_profile");

CREATE TABLE IF NOT EXISTS "keyword for deal"
 (
	"id_keyword for deal"			SERIAL, 
	"link_investee_record_id"			INTEGER, 
	"link_investment round id"			INTEGER, 
	"link_keyword category id"			INTEGER, 
	"remark (keyword for deal)"			VARCHAR (255), 
	"date entered (keyword record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"date modified (keyword record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_keywordfordealrecord"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "keyword for deal_link_keyword category id_idx" ON "keyword for deal" ("link_keyword category id");

CREATE TABLE IF NOT EXISTS "link_artificial_intelligence_cate"
 (
	"id_artificial_intelligence_cate"			SERIAL, 
	"artificial intelligence cate 1"			VARCHAR (255), 
	"artificial intelligence cate 2"			VARCHAR (255), 
	"artificial intelligence cate 3"			VARCHAR (255), 
	"artificial intelligence deal"			BOOLEAN NOT NULL, 
	"ranking of artificial intelligence in msaccess"			DOUBLE PRECISION, 
	"displayed artificial intelligence cate in databank lv 1"			VARCHAR (255), 
	"displayed artificial intelligence cate in databank lv 2"			VARCHAR (255), 
	"displayed artificial intelligence cate in databank lv 3"			VARCHAR (255), 
	"ranking of artificial intelligence cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu"			BOOLEAN NOT NULL, 
	"include_example"			TEXT, 
	"exclude_example"			TEXT, 
	"note_internal"			TEXT, 
	"tech deal_note"			TEXT
);
COMMENT ON COLUMN "link_artificial_intelligence_cate"."artificial intelligence deal" IS 'this is to identify whether this asset type is include in calcuation or not';

-- CREATE INDEXES ...
ALTER TABLE "link_artificial_intelligence_cate" ADD CONSTRAINT "link_artificial_intelligence_cate_pkey" PRIMARY KEY ("id_artificial_intelligence_cate");

CREATE TABLE IF NOT EXISTS "link_auxservprovider nature"
 (
	"id_auxservprovider_nature"			SERIAL, 
	"nature of auxiliary service provider"			VARCHAR (255), 
	"ranking of auxiliary service provider in msaccess"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_auxservprovider nature" ADD CONSTRAINT "link_auxservprovider nature_pkey" PRIMARY KEY ("id_auxservprovider_nature");

CREATE TABLE IF NOT EXISTS "link_battery_cate"
 (
	"id_battery_cate"			SERIAL, 
	"battery cate 1"			VARCHAR (255), 
	"battery cate 2"			VARCHAR (255), 
	"battery cate 3"			VARCHAR (255), 
	"battery deal"			BOOLEAN NOT NULL, 
	"ranking of battery in msaccess"			DOUBLE PRECISION, 
	"displayed battery cate in databank lv 1"			VARCHAR (255), 
	"displayed battery cate in databank lv 2"			VARCHAR (255), 
	"displayed battery cate in databank lv 3"			VARCHAR (255), 
	"ranking of battery cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu"			BOOLEAN NOT NULL, 
	"include_example"			TEXT, 
	"exclude_example"			TEXT, 
	"note_internal"			TEXT, 
	"tech deal_note"			TEXT
);
COMMENT ON COLUMN "link_battery_cate"."battery deal" IS 'this is to identify whether this asset type is include in calcuation or not';

-- CREATE INDEXES ...
ALTER TABLE "link_battery_cate" ADD CONSTRAINT "link_battery_cate_pkey" PRIMARY KEY ("id_battery_cate");

CREATE TABLE IF NOT EXISTS "link_country"
 (
	"id_country"			SERIAL, 
	"country (short form)"			VARCHAR (255), 
	"country (official long form)"			VARCHAR (255), 
	"displayed country in databank"			VARCHAR (255), 
	"displayed country in divestment record"			VARCHAR (255), 
	"displayed country region in databank level 1"			VARCHAR (255), 
	"ranking of country region in databank"			DOUBLE PRECISION, 
	"country region level 2"			VARCHAR (255), 
	"country region level 2b (for valuation)"			VARCHAR (255), 
	"country region level 3"			VARCHAR (255), 
	"currency code"			VARCHAR (255), 
	"currency name"			VARCHAR (255), 
	"currency symbol"			VARCHAR (255), 
	"loc_type_calcu"			VARCHAR (255)
);
COMMENT ON COLUMN "link_country"."displayed country in divestment record" IS 'Hong Kong will not be grouped to China in divestment record.  Other location is the same as investment';

-- CREATE INDEXES ...
CREATE INDEX "link_country_currency code_idx" ON "link_country" ("currency code");
ALTER TABLE "link_country" ADD CONSTRAINT "link_country_pkey" PRIMARY KEY ("id_country");

CREATE TABLE IF NOT EXISTS "link_credit finance type"
 (
	"id_credit finance type"			SERIAL, 
	"credit finance type"			VARCHAR (255), 
	"sequence of credit finance type in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_credit finance type" ADD CONSTRAINT "link_credit finance type_pkey" PRIMARY KEY ("id_credit finance type");

CREATE TABLE IF NOT EXISTS "link_data source"
 (
	"id_data source"			SERIAL, 
	"data source"			VARCHAR (255), 
	"situation to use"			TEXT, 
	"example"			TEXT, 
	"ranking of data source in msaccess"			DOUBLE PRECISION, 
	"show in databank"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_data source" ADD CONSTRAINT "link_data source_pkey" PRIMARY KEY ("id_data source");

CREATE TABLE IF NOT EXISTS "link_deal nature"
 (
	"id_deal nature"			SERIAL, 
	"deal nature"			VARCHAR (255), 
	"ranking of deal nature in msaccess"			DOUBLE PRECISION, 
	"displayed deal nature in databank_investment"			VARCHAR (255), 
	"ranking of deal nature in databank_investment"			DOUBLE PRECISION, 
	"displayed deal nature in databank_divestment"			VARCHAR (255), 
	"ranking of deal nature in databank_divestment"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_deal nature" ADD CONSTRAINT "link_deal nature_pkey" PRIMARY KEY ("id_deal nature");

CREATE TABLE IF NOT EXISTS "link_deal size type"
 (
	"id_deal size type"			SERIAL, 
	"deal size type"			VARCHAR (255), 
	"situation to use"			TEXT, 
	"example"			TEXT, 
	"ranking of data source in msaccess"			INTEGER
);

-- CREATE INDEXES ...
ALTER TABLE "link_deal size type" ADD CONSTRAINT "link_deal size type_pkey" PRIMARY KEY ("id_deal size type");

CREATE TABLE IF NOT EXISTS "link_dealcountpecate"
 (
	"id_pedealcountcate"			SERIAL, 
	"pedealcounttype"			VARCHAR (255), 
	"dealtypelevel_menu"			VARCHAR (255), 
	"displayed pedealcounttype"			VARCHAR (255), 
	"ranking of pedealcounttype in msaccess"			DOUBLE PRECISION, 
	"display pedealcounttype in databank"			VARCHAR (255), 
	"ranking of pedealcounttype in databank"			DOUBLE PRECISION, 
	"pedeal_calcu"			VARCHAR (255), 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255), 
	"xfirm_subcate_lv2"			VARCHAR (255), 
	"xdisplay firm_subcate_lv1 in databank"			VARCHAR (255), 
	"xranking of firm_subcate_lv1 in databank"			DOUBLE PRECISION
);
COMMENT ON COLUMN "link_dealcountpecate"."dealtypelevel_menu" IS 'Control to show in dropdown menu a) Investor Invest Round or b) in Deal Round';

-- CREATE INDEXES ...
ALTER TABLE "link_dealcountpecate" ADD CONSTRAINT "link_dealcountpecate_pkey" PRIMARY KEY ("id_pedealcountcate");

CREATE TABLE IF NOT EXISTS "link_electric_vehicle_cate"
 (
	"id_electric_vehicle_cate"			SERIAL, 
	"electric vehicle cate 1"			VARCHAR (255), 
	"electric vehicle cate 2"			VARCHAR (255), 
	"electric vehicle cate 3"			VARCHAR (255), 
	"electric vehicle deal"			BOOLEAN NOT NULL, 
	"ranking of electric vehicle in msaccess"			DOUBLE PRECISION, 
	"displayed electric vehicle cate in databank lv 1"			VARCHAR (255), 
	"displayed electric vehicle cate in databank lv 2"			VARCHAR (255), 
	"displayed electric vehicle cate in databank lv 3"			VARCHAR (255), 
	"ranking of electric vehicle cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu"			BOOLEAN NOT NULL, 
	"include_example"			TEXT, 
	"exclude_example"			TEXT, 
	"note_internal"			TEXT, 
	"tech deal_note"			TEXT
);
COMMENT ON COLUMN "link_electric_vehicle_cate"."electric vehicle deal" IS 'this is to identify whether this asset type is include in calcuation or not';

-- CREATE INDEXES ...
ALTER TABLE "link_electric_vehicle_cate" ADD CONSTRAINT "link_electric_vehicle_cate_pkey" PRIMARY KEY ("id_electric_vehicle_cate");

CREATE TABLE IF NOT EXISTS "link_exit status"
 (
	"id_exit status"			SERIAL, 
	"exit status"			VARCHAR (255), 
	"ranking of exit status in msaccess"			DOUBLE PRECISION, 
	"displayed exit status in databank"			VARCHAR (255), 
	"ranking of exit status in databank"			DOUBLE PRECISION, 
	"displayed exit status footnote in databank"			VARCHAR (255)
);
COMMENT ON COLUMN "link_exit status"."displayed exit status footnote in databank" IS '1 (Completely Exited); 2 (Partially Exited); 3 (IPO)';

-- CREATE INDEXES ...
ALTER TABLE "link_exit status" ADD CONSTRAINT "link_exit status_pkey" PRIMARY KEY ("id_exit status");

CREATE TABLE IF NOT EXISTS "link_fail reason"
 (
	"id_fail reason"			SERIAL, 
	"fail reason"			VARCHAR (255), 
	"situation to use"			TEXT, 
	"example"			TEXT, 
	"ranking of fail reason in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
CREATE UNIQUE INDEX "link_fail reason_id_fail reason_idx" ON "link_fail reason" ("id_fail reason");
ALTER TABLE "link_fail reason" ADD CONSTRAINT "link_fail reason_pkey" PRIMARY KEY ("id_fail reason");

CREATE TABLE IF NOT EXISTS "link_firmaffiliate"
 (
	"id_firmaffil"			SERIAL, 
	"firmaffil"			VARCHAR (255), 
	"display firmaffil in aper"			VARCHAR (255), 
	"ranking of firmaffil in msaccess"			DOUBLE PRECISION, 
	"display firmaffil in databank"			VARCHAR (255), 
	"ranking of firmaffil in databank"			DOUBLE PRECISION, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_firmaffiliate" ADD CONSTRAINT "link_firmaffiliate_pkey" PRIMARY KEY ("id_firmaffil");

CREATE TABLE IF NOT EXISTS "link_firmcate"
 (
	"id_firmcate"			SERIAL, 
	"firm_maincate"			VARCHAR (255), 
	"firm_subcate_lv1"			VARCHAR (255), 
	"firm_subcate_lv2"			VARCHAR (255), 
	"display firm_maincate in aper"			VARCHAR (255), 
	"display firm_subcate_lv1 in aper"			VARCHAR (255), 
	"ranking of subcate_lv1 in msaccess"			DOUBLE PRECISION, 
	"display firm_maincate in databank"			VARCHAR (255), 
	"ranking of firm_maincate in databank"			DOUBLE PRECISION, 
	"display firm_subcate_lv1 in databank"			VARCHAR (255), 
	"ranking of firm_subcate_lv1 in databank"			DOUBLE PRECISION, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_firmcate" ADD CONSTRAINT "link_firmcate_pkey" PRIMARY KEY ("id_firmcate");

CREATE TABLE IF NOT EXISTS "link_fund category"
 (
	"id_fund category"			SERIAL, 
	"fund category"			VARCHAR (255), 
	"displayed fund category"			VARCHAR (255), 
	"ranking of fund category in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_fund category" ADD CONSTRAINT "link_fund category_pkey" PRIMARY KEY ("id_fund category");

CREATE TABLE IF NOT EXISTS "link_fund geo focus"
 (
	"id_fund geo focus"			SERIAL, 
	"fund geo focus type"			VARCHAR (255), 
	"group ranking of fund geo focus in msaccess"			INTEGER, 
	"fund geo focus"			VARCHAR (255), 
	"displayed fund geo focus"			VARCHAR (255), 
	"fund geo focus region"			VARCHAR (255), 
	"fund geo focus based in asia"			BOOLEAN NOT NULL, 
	"show in msaccess drop down menu"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus type" IS 'Fund Geo Focus Type?';
COMMENT ON COLUMN "link_fund geo focus"."group ranking of fund geo focus in msaccess" IS 'Group Ranking of Fund Geo Focus';
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus" IS 'Fund Geo Focus';
COMMENT ON COLUMN "link_fund geo focus"."displayed fund geo focus" IS 'Displayed Fund Geo Focus';
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus region" IS 'Fund Geo Focus Region?';
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus based in asia" IS 'Asia/Non-Asia?';

-- CREATE INDEXES ...
ALTER TABLE "link_fund geo focus" ADD CONSTRAINT "link_fund geo focus_pkey" PRIMARY KEY ("id_fund geo focus");

CREATE TABLE IF NOT EXISTS "link_fundingrd_cat_main_item"
 (
	"id_fundrdcatemain"			SERIAL, 
	"fundingrd_cate_main"			VARCHAR (255), 
	"display fundingrd_cate_main"			VARCHAR (255), 
	"ranking of fundingrd_cate_main in msaccess"			DOUBLE PRECISION, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255), 
	"show item in dropdown list"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_fundingrd_cat_main_item" ADD CONSTRAINT "link_fundingrd_cat_main_item_pkey" PRIMARY KEY ("id_fundrdcatemain");

CREATE TABLE IF NOT EXISTS "link_fundingrd_cat_suffix_1_item"
 (
	"id_fundrdcatesuffix1"			SERIAL, 
	"fundingrd_cate_suffix1"			VARCHAR (255), 
	"display fundingrd_cate_suffix1"			VARCHAR (255), 
	"ranking of fundingrd_cate_suffix1 in msaccess"			DOUBLE PRECISION, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255), 
	"show item in dropdown list"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_fundingrd_cat_suffix_1_item" ADD CONSTRAINT "link_fundingrd_cat_suffix_1_item_pkey" PRIMARY KEY ("id_fundrdcatesuffix1");

CREATE TABLE IF NOT EXISTS "link_fundingrd_cat_suffix_2_item"
 (
	"id_fundrdcatesuffix2"			SERIAL, 
	"fundingrd_cate_suffix2"			VARCHAR (255), 
	"display fundingrd_cate_suffix2"			VARCHAR (255), 
	"ranking of fundingrd_cate_suffix2 in msaccess"			DOUBLE PRECISION, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255), 
	"show item in dropdown list"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_fundingrd_cat_suffix_2_item" ADD CONSTRAINT "link_fundingrd_cat_suffix_2_item_pkey" PRIMARY KEY ("id_fundrdcatesuffix2");

CREATE TABLE IF NOT EXISTS "link_geo focus type"
 (
	"id_geo focus type"			SERIAL, 
	"geo focus type"			VARCHAR (255), 
	"asia related"			VARCHAR (255), 
	"f_geo_focus_type"			VARCHAR (255), 
	"ranking of geo focus type in msaccess"			DOUBLE PRECISION, 
	"note"			TEXT
);

-- CREATE INDEXES ...
ALTER TABLE "link_geo focus type" ADD CONSTRAINT "link_geo focus type_pkey" PRIMARY KEY ("id_geo focus type");

CREATE TABLE IF NOT EXISTS "link_healthcare_cate"
 (
	"id_healthcare_deal_cate"			SERIAL, 
	"healthcare cate 1"			VARCHAR (255), 
	"healthcare cate 2"			VARCHAR (255), 
	"healthcare cate 3"			VARCHAR (255), 
	"ranking of healthcare in msaccess"			DOUBLE PRECISION, 
	"displayed healthcare cate in databank level 1"			VARCHAR (255), 
	"displayed healthcare cate in databank level 2"			VARCHAR (255), 
	"displayed healthcare cate in databank level 3"			VARCHAR (255), 
	"ranking of healthcare cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu"			BOOLEAN NOT NULL, 
	"include_example"			TEXT, 
	"exclude_example"			TEXT, 
	"note_internal"			TEXT
);

-- CREATE INDEXES ...
ALTER TABLE "link_healthcare_cate" ADD CONSTRAINT "link_healthcare_cate_pkey" PRIMARY KEY ("id_healthcare_deal_cate");

CREATE TABLE IF NOT EXISTS "link_industry"
 (
	"id_industry"			SERIAL, 
	"macro industry"			VARCHAR (255), 
	"industry"			VARCHAR (255), 
	"sub-industry"			VARCHAR (255), 
	"ranking of sub-industry in msaccess"			DOUBLE PRECISION, 
	"displayed industry in databank level 1"			VARCHAR (255), 
	"ranking of industry in databank level 1"			DOUBLE PRECISION, 
	"displayed industry in databank level 2"			VARCHAR (255), 
	"ranking of industry in databank level 2"			DOUBLE PRECISION, 
	"(old 20110803) macro industry"			VARCHAR (255), 
	"(old 20110803) industry"			VARCHAR (255), 
	"(old 20110803) sub-industry"			VARCHAR (255), 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_industry" ADD CONSTRAINT "link_industry_pkey" PRIMARY KEY ("id_industry");

CREATE TABLE IF NOT EXISTS "link_info_othercateitem"
 (
	"id_info_other_cate"			SERIAL, 
	"infotype"			VARCHAR (255), 
	"db related module"			VARCHAR (255), 
	"info main cate"			VARCHAR (255), 
	"info cate 1"			VARCHAR (255), 
	"info cate 2"			VARCHAR (255), 
	"ranking of info cate in msaccess"			DOUBLE PRECISION, 
	"displayed info cate in databank level 1"			VARCHAR (255), 
	"displayed info cate in databank level 2"			VARCHAR (255), 
	"ranking of info cate cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu_investee"			BOOLEAN NOT NULL, 
	"example"			TEXT, 
	"note_internal"			TEXT
);
COMMENT ON COLUMN "link_info_othercateitem"."infotype" IS 'eg Valuation';
COMMENT ON COLUMN "link_info_othercateitem"."db related module" IS 'eg investeeInfo, investeeFundraisingRD, investorInfo, investorInvestRd';
COMMENT ON COLUMN "link_info_othercateitem"."info main cate" IS 'eg Tech Firm Valuation Unicorn';
COMMENT ON COLUMN "link_info_othercateitem"."info cate 1" IS 'eg Unicorn';

-- CREATE INDEXES ...
ALTER TABLE "link_info_othercateitem" ADD CONSTRAINT "link_info_othercateitem_pkey" PRIMARY KEY ("id_info_other_cate");

CREATE TABLE IF NOT EXISTS "link_investfocus"
 (
	"id_investfocuscate"			SERIAL, 
	"invfocus type"			VARCHAR (255), 
	"invfocusmaincate"			VARCHAR (255), 
	"invfocussubcate_lv1"			VARCHAR (255), 
	"invfocussubcate_lv2"			VARCHAR (255), 
	"displayed_invfocusmaincate"			VARCHAR (255), 
	"displayed_invfocussubcate_lv1"			VARCHAR (255), 
	"displayed_invfocussubcate_lv2"			VARCHAR (255), 
	"ranking of invfocussubcate_lv1 in msaccess"			DOUBLE PRECISION, 
	"ranking of invfocussubcate databank"			DOUBLE PRECISION, 
	"ranking of invfocussubcate_lv1 in databank"			DOUBLE PRECISION, 
	"invfocuscate_enterdate"			TIMESTAMP WITHOUT TIME ZONE, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_investfocus" ADD CONSTRAINT "link_investfocus_pkey" PRIMARY KEY ("id_investfocuscate");

CREATE TABLE IF NOT EXISTS "link_investor name note"
 (
	"id_investor name note"			SERIAL, 
	"note_investor name"			VARCHAR (255), 
	"ranking of investor name note"			DOUBLE PRECISION
);
COMMENT ON COLUMN "link_investor name note"."id_investor name note" IS 'This table was replaced by the table (Link_note_item) on 14 Mar 2024';

-- CREATE INDEXES ...
ALTER TABLE "link_investor name note" ADD CONSTRAINT "link_investor name note_pkey" PRIMARY KEY ("id_investor name note");

CREATE TABLE IF NOT EXISTS "link_investor profile"
 (
	"id_investor profile"			SERIAL, 
	"investor profile"			VARCHAR (255), 
	"displayed investor profile"			VARCHAR (255), 
	"ranking of investor type in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_investor profile" ADD CONSTRAINT "link_investor profile_pkey" PRIMARY KEY ("id_investor profile");

CREATE TABLE IF NOT EXISTS "link_investor type"
 (
	"id_investor type"			SERIAL, 
	"investor type"			VARCHAR (255), 
	"displayed investor type"			VARCHAR (255), 
	"ranking of investor type in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_investor type" ADD CONSTRAINT "link_investor type_pkey" PRIMARY KEY ("id_investor type");

CREATE TABLE IF NOT EXISTS "link_investor_profile_other"
 (
	"id_investor_profile_type"			SERIAL, 
	"investor_profile_type"			VARCHAR (255), 
	"displayed_investor_profile"			VARCHAR (255), 
	"ranking_investor_profile_type_in_msaccess"			DOUBLE PRECISION, 
	"asia related"			VARCHAR (255), 
	"note"			TEXT
);

-- CREATE INDEXES ...
ALTER TABLE "link_investor_profile_other" ADD CONSTRAINT "link_investor_profile_other_pkey" PRIMARY KEY ("id_investor_profile_type");

CREATE TABLE IF NOT EXISTS "link_keyword category"
 (
	"id_keyword category"			SERIAL, 
	"keyword (macro)"			VARCHAR (255), 
	"keyword"			VARCHAR (255), 
	"keyword (short form)"			VARCHAR (255), 
	"note"			VARCHAR (255), 
	"keyword category enter date"			TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"keyword backdated to date"			TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"example"			VARCHAR (255), 
	"type include"			VARCHAR (255), 
	"type exclude"			VARCHAR (255), 
	"date entered_keyword_auto"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_keyword"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_keyword"			VARCHAR (255)
);
COMMENT ON COLUMN "link_keyword category"."keyword" IS 'Enter the name of the new Keyword';
COMMENT ON COLUMN "link_keyword category"."note" IS 'Any note regarding to this keyword one should pay attention to such as under which situation should this keyword category be chosen';
COMMENT ON COLUMN "link_keyword category"."keyword category enter date" IS 'Date of this Keyword entered in this list.  (The date the person entering this keyword item into database.)';
COMMENT ON COLUMN "link_keyword category"."keyword backdated to date" IS 'The earliest Investment date of existing investment record being categorized based on this keyword.  If no backdate for this newly added keyword has been carried out, just enter the same date as the "Keyword category enter date".';
COMMENT ON COLUMN "link_keyword category"."example" IS 'Optional.  To put down some examples which can help user to judge whether choosing this Keyword in future.';

-- CREATE INDEXES ...
CREATE INDEX "link_keyword category_keyword_idx" ON "link_keyword category" ("keyword");
CREATE INDEX "link_keyword category_keyword (short form)_idx" ON "link_keyword category" ("keyword (short form)");
CREATE INDEX "link_keyword category_keyword backdated to  date_idx" ON "link_keyword category" ("keyword backdated to date");
ALTER TABLE "link_keyword category" ADD CONSTRAINT "link_keyword category_pkey" PRIMARY KEY ("id_keyword category");

CREATE TABLE IF NOT EXISTS "link_month"
 (
	"id_month"			SERIAL, 
	"month_internal_use"			VARCHAR (255), 
	"ranking of month in msaccess"			DOUBLE PRECISION, 
	"displayed month of invest in databank"			VARCHAR (255), 
	"month_number"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_month" ADD CONSTRAINT "link_month_pkey" PRIMARY KEY ("id_month");

CREATE TABLE IF NOT EXISTS "link_nature of sale"
 (
	"id_nature of sale"			SERIAL, 
	"nature of sale"			VARCHAR (255), 
	"ranking of nature of sale in msaccess"			DOUBLE PRECISION, 
	"displayed nature of sale in databank"			VARCHAR (255), 
	"ranking of nature of sale in databank"			DOUBLE PRECISION, 
	"displayed nature of sale for internal calculation"			VARCHAR (255), 
	"ranking of nature of sale fro internal calculation"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_nature of sale" ADD CONSTRAINT "link_nature of sale_pkey" PRIMARY KEY ("id_nature of sale");

CREATE TABLE IF NOT EXISTS "link_note_item"
 (
	"id_note_cate"			SERIAL, 
	"note_type"			VARCHAR (255), 
	"db_related"			VARCHAR (255), 
	"db_field_related"			VARCHAR (255), 
	"note cate 1"			VARCHAR (255), 
	"note cate 2"			VARCHAR (255), 
	"note cate 3"			VARCHAR (255), 
	"ranking of note cate in msaccess"			DOUBLE PRECISION, 
	"displayed note cate in databank  lv 1"			VARCHAR (255), 
	"displayed note cate in databank  lv 2"			VARCHAR (255), 
	"displayed note cate in databank  lv 3"			VARCHAR (255), 
	"ranking of note cate in databank"			DOUBLE PRECISION, 
	"example"			TEXT, 
	"note_internal"			TEXT, 
	"show in msaccess menu_tbl_investor_name_fld_name_note"			BOOLEAN NOT NULL, 
	"show in msaccess menu_tbl_firm_locat_fld_special_case"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_note_item" ADD CONSTRAINT "link_note_item_pkey" PRIMARY KEY ("id_note_cate");

CREATE TABLE IF NOT EXISTS "link_periodic_interval"
 (
	"id_interval"			SERIAL, 
	"interval type"			VARCHAR (255), 
	"interval"			VARCHAR (255), 
	"displayed_interval_in_databank"			VARCHAR (255), 
	"ranking_of_interval_ in_msaccess"			DOUBLE PRECISION, 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL, 
	"example"			TEXT, 
	"note_internal"			TEXT
);

-- CREATE INDEXES ...
ALTER TABLE "link_periodic_interval" ADD CONSTRAINT "link_periodic_interval_pkey" PRIMARY KEY ("id_interval");

CREATE TABLE IF NOT EXISTS "link_real_asset_cate"
 (
	"id_real_asset_deal_cate"			SERIAL, 
	"real asset cate 1"			VARCHAR (255), 
	"real asset cate 2"			VARCHAR (255), 
	"real asset cate 3"			VARCHAR (255), 
	"real asset deal"			BOOLEAN NOT NULL, 
	"ranking of real asset in msaccess"			DOUBLE PRECISION, 
	"displayed real asset cate in databank level 1"			VARCHAR (255), 
	"displayed real asset cate in databank level 2"			VARCHAR (255), 
	"displayed real asset cate in databank level 3"			VARCHAR (255), 
	"ranking of real asset cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu"			BOOLEAN NOT NULL, 
	"include_example"			TEXT, 
	"exclude_example"			TEXT, 
	"note_internal"			TEXT
);
COMMENT ON COLUMN "link_real_asset_cate"."real asset deal" IS 'this is to identify whether this real asset type is include as real asset calcuation or not';

-- CREATE INDEXES ...
ALTER TABLE "link_real_asset_cate" ADD CONSTRAINT "link_real_asset_cate_pkey" PRIMARY KEY ("id_real_asset_deal_cate");

CREATE TABLE IF NOT EXISTS "link_semiconductor_cate"
 (
	"id_semiconductor_cate"			SERIAL, 
	"semiconductor cate 1"			VARCHAR (255), 
	"semiconductor cate 2"			VARCHAR (255), 
	"semiconductor cate 3"			VARCHAR (255), 
	"semiconductor deal"			BOOLEAN NOT NULL, 
	"ranking of semiconductor in msaccess"			DOUBLE PRECISION, 
	"displayed semiconductor cate in databank lv 1"			VARCHAR (255), 
	"displayed semiconductor cate in databank lv 2"			VARCHAR (255), 
	"displayed semiconductor cate in databank lv 3"			VARCHAR (255), 
	"ranking of semiconductor cate in databank"			DOUBLE PRECISION, 
	"show in msaccess menu"			BOOLEAN NOT NULL, 
	"include_example"			TEXT, 
	"exclude_example"			TEXT, 
	"note_internal"			TEXT, 
	"tech deal_note"			TEXT
);
COMMENT ON COLUMN "link_semiconductor_cate"."semiconductor deal" IS 'this is to identify whether this asset type is include in calcuation or not';

-- CREATE INDEXES ...
ALTER TABLE "link_semiconductor_cate" ADD CONSTRAINT "link_semiconductor_cate_pkey" PRIMARY KEY ("id_semiconductor_cate");

CREATE TABLE IF NOT EXISTS "link_sri focus"
 (
	"id_sri focus"			SERIAL, 
	"sri focus"			VARCHAR (255), 
	"ranking of sri focus in msaccess"			DOUBLE PRECISION, 
	"displayed sri focus in databank"			VARCHAR (255), 
	"ranking of sri focus in databank"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_sri focus" ADD CONSTRAINT "link_sri focus_pkey" PRIMARY KEY ("id_sri focus");

CREATE TABLE IF NOT EXISTS "link_stage of invest"
 (
	"id_stage of invest"			SERIAL, 
	"stage of investment"			VARCHAR (255), 
	"ranking of stage of invest in msaccess"			DOUBLE PRECISION, 
	"displayed stage of investment in databank"			VARCHAR (255), 
	"ranking of stage of invest in databank"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_stage of invest" ADD CONSTRAINT "link_stage of invest_pkey" PRIMARY KEY ("id_stage of invest");

CREATE TABLE IF NOT EXISTS "link_tech deal category"
 (
	"id_tech deal category"			SERIAL, 
	"tech deal category 1"			VARCHAR (255), 
	"tech deal category 2"			VARCHAR (255), 
	"ranking of tech deal in msaccess"			DOUBLE PRECISION, 
	"displayed tech deal category in databank level 1"			VARCHAR (255), 
	"displayed tech deal category in databank level 2"			VARCHAR (255), 
	"ranking of tech deal in databank"			DOUBLE PRECISION, 
	"note"			TEXT
);

-- CREATE INDEXES ...
ALTER TABLE "link_tech deal category" ADD CONSTRAINT "link_tech deal category_pkey" PRIMARY KEY ("id_tech deal category");

CREATE TABLE IF NOT EXISTS "link_update_record_status"
 (
	"id_update_record_status"			SERIAL, 
	"info_type"			VARCHAR (255), 
	"db_related_module"			VARCHAR (255), 
	"update_record_status_1"			VARCHAR (255), 
	"update_record_status_2"			VARCHAR (255), 
	"update_record_status_3"			VARCHAR (255), 
	"ranking_of_update_record_status_ in_msaccess"			DOUBLE PRECISION, 
	"displayed_update_record_status_in_databank_level_1"			VARCHAR (255), 
	"displayed_update_record_status_in_databank_level_2"			VARCHAR (255), 
	"ranking_of_update_record_status_ in_databank"			DOUBLE PRECISION, 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL, 
	"example"			TEXT, 
	"note_internal"			TEXT
);
COMMENT ON COLUMN "link_update_record_status"."info_type" IS 'eg Any, All, Investment, Exit';
COMMENT ON COLUMN "link_update_record_status"."db_related_module" IS 'eg investeeInfo, investeeFundraisingRD, investorInfo, investorInvestRd, divestDB';
COMMENT ON COLUMN "link_update_record_status"."update_record_status_1" IS 'eg pending';
COMMENT ON COLUMN "link_update_record_status"."update_record_status_2" IS 'eg Completed, Pending completion (disclosed or officially announced previously)';

-- CREATE INDEXES ...
ALTER TABLE "link_update_record_status" ADD CONSTRAINT "link_update_record_status_pkey" PRIMARY KEY ("id_update_record_status");

CREATE TABLE IF NOT EXISTS "link_valuation investee stage"
 (
	"id_valuation investee stage"			SERIAL, 
	"investee stage"			VARCHAR (255), 
	"displayed investee stage"			VARCHAR (255), 
	"ranking of investee stage in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_valuation investee stage" ADD CONSTRAINT "link_valuation investee stage_pkey" PRIMARY KEY ("id_valuation investee stage");

CREATE TABLE IF NOT EXISTS "link_valuation record type"
 (
	"id_valuation record type"			SERIAL, 
	"valuation record type"			VARCHAR (255), 
	"valuation record type level 1"			VARCHAR (255), 
	"situation to use"			TEXT, 
	"example"			TEXT, 
	"ranking of valuation record type in msaccess"			INTEGER
);

-- CREATE INDEXES ...
ALTER TABLE "link_valuation record type" ADD CONSTRAINT "link_valuation record type_pkey" PRIMARY KEY ("id_valuation record type");

CREATE TABLE IF NOT EXISTS "link_valuation_equity value calculation basis"
 (
	"id_valuation_equity value calculation basis"			SERIAL, 
	"equity value calculation basis"			VARCHAR (255), 
	"ranking of equity value calculation basis in msaccess"			DOUBLE PRECISION
);

-- CREATE INDEXES ...
ALTER TABLE "link_valuation_equity value calculation basis" ADD CONSTRAINT "link_valuation_equity value calculation basis_pkey" PRIMARY KEY ("id_valuation_equity value calculation basis");

CREATE TABLE IF NOT EXISTS "link_year"
 (
	"id_year"			SERIAL, 
	"year_internal use"			VARCHAR (255), 
	"ranking of year in msaccess"			DOUBLE PRECISION, 
	"displayed year of invest in databank"			VARCHAR (255), 
	"year_numeric_for_calculation"			INTEGER
);

-- CREATE INDEXES ...
ALTER TABLE "link_year" ADD CONSTRAINT "link_year_pkey" PRIMARY KEY ("id_year");

CREATE TABLE IF NOT EXISTS "link_yes_no_field"
 (
	"id_yes_no_field"			SERIAL, 
	"yes_no_field"			VARCHAR (255), 
	"ranking of yes_no in msaccess"			INTEGER, 
	"displayed yes_no in msaccess"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_yes_no_field" ADD CONSTRAINT "link_yes_no_field_pkey" PRIMARY KEY ("id_yes_no_field");

CREATE TABLE IF NOT EXISTS "old 20141124 link_valuation record type"
 (
	"id_valuation record type"			SERIAL, 
	"valuation record type"			VARCHAR (255), 
	"situation to use"			TEXT, 
	"example"			TEXT, 
	"ranking of valuation record type in msaccess"			INTEGER
);

-- CREATE INDEXES ...
ALTER TABLE "old 20141124 link_valuation record type" ADD CONSTRAINT "old 20141124 link_valuation record type_pkey" PRIMARY KEY ("id_valuation record type");

CREATE TABLE IF NOT EXISTS "paste errors"
 (
	"field0"			TEXT
);

-- CREATE INDEXES ...

CREATE TABLE IF NOT EXISTS "sheet1"
 (
	"f1"			VARCHAR (255)
);

-- CREATE INDEXES ...

CREATE TABLE IF NOT EXISTS "stock_exchange"
 (
	"id_stock_exchange"			SERIAL, 
	"info_type"			VARCHAR (255), 
	"db_related_module"			VARCHAR (255), 
	"stock_exchange"			VARCHAR (255), 
	"board of stock exchange"			VARCHAR (255), 
	"stock_exchange_and_board"			VARCHAR (255), 
	"link_country_id_stock_exchange_location"			INTEGER, 
	"ranking_of_stock_exchange_and_board_ in_msaccess"			DOUBLE PRECISION, 
	"displayed_stock_exchange_and_board_in_databank_level_1"			VARCHAR (255), 
	"displayed_stock_exchange_and_board_in_databank_level_2"			VARCHAR (255), 
	"ranking_of_stock_exchange_and_board_ in_databank"			DOUBLE PRECISION, 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL, 
	"example"			TEXT, 
	"note_internal"			TEXT
);
COMMENT ON COLUMN "stock_exchange"."info_type" IS 'eg Any, All, Investment, Exit';
COMMENT ON COLUMN "stock_exchange"."db_related_module" IS 'B';

-- CREATE INDEXES ...
ALTER TABLE "stock_exchange" ADD CONSTRAINT "stock_exchange_pkey" PRIMARY KEY ("id_stock_exchange");

CREATE TABLE IF NOT EXISTS "temp 20131015 new cross border"
 (
	"id"			SERIAL, 
	"2nd deal id"			DOUBLE PRECISION, 
	"investee id"			DOUBLE PRECISION, 
	"company"			VARCHAR (255), 
	"web site"			VARCHAR (255), 
	"location"			VARCHAR (255), 
	"year of investment"			VARCHAR (255), 
	"month of investment"			VARCHAR (255), 
	"displayed investor name"			VARCHAR (255), 
	"to be counted as cross broder deal (2013-11-10)"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "temp 20131015 new cross border_2nd deal id_idx" ON "temp 20131015 new cross border" ("2nd deal id");
CREATE INDEX "temp 20131015 new cross border_id1_idx" ON "temp 20131015 new cross border" ("investee id");
ALTER TABLE "temp 20131015 new cross border" ADD CONSTRAINT "temp 20131015 new cross border_pkey" PRIMARY KEY ("id");

CREATE TABLE IF NOT EXISTS "temp import data file 20240529"
 (
	"company id"			INTEGER, 
	"company name"			TEXT, 
	"ai id temp"			Unknown_0013, 
	"new ai classification"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "temp import data file 20240529_company id_idx" ON "temp import data file 20240529" ("company id");

CREATE TABLE IF NOT EXISTS "link_currencycode"
 (
	"id_currencycode"			SERIAL, 
	"market"			VARCHAR (255), 
	"currency code"			VARCHAR (255), 
	"currency name"			VARCHAR (255), 
	"currency symbol"			VARCHAR (255), 
	"remark"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "link_currencycode_currency code_idx" ON "link_currencycode" ("currency code");
ALTER TABLE "link_currencycode" ADD CONSTRAINT "link_currencycode_pkey" PRIMARY KEY ("id_currencycode");

CREATE TABLE IF NOT EXISTS "link_event_status"
 (
	"id_event_status"			SERIAL, 
	"info_type"			VARCHAR (255), 
	"db_related_module"			VARCHAR (255), 
	"event_status_1"			VARCHAR (255), 
	"event_status_2"			VARCHAR (255), 
	"event_status_3"			VARCHAR (255), 
	"ranking_of_event_status_ in_msaccess"			DOUBLE PRECISION, 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"displayed_event_status_in_databank_investment_level_1"			VARCHAR (255), 
	"displayed_event_status_in_databank_investment_level_2"			VARCHAR (255), 
	"ranking_of_event_status_ in_databank_investment"			DOUBLE PRECISION, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL, 
	"displayed_event_status_in_databank_divestment_level_1"			VARCHAR (255), 
	"displayed_event_status_in_databank_divestment_level_2"			VARCHAR (255), 
	"ranking_of_event_status_ in_databank_divestment"			DOUBLE PRECISION, 
	"divestment_status_type_valid_for_pedata_calculation"			BOOLEAN NOT NULL, 
	"example"			TEXT, 
	"note_internal"			TEXT
);
COMMENT ON COLUMN "link_event_status"."info_type" IS 'eg Any, All, Investment, Exit';
COMMENT ON COLUMN "link_event_status"."db_related_module" IS 'eg investeeInfo, investeeFundraisingRD, investorInfo, investorInvestRd, divestDB';
COMMENT ON COLUMN "link_event_status"."event_status_1" IS 'eg pending';
COMMENT ON COLUMN "link_event_status"."event_status_2" IS 'eg Completed, Pending completion (disclosed or officially announced previously)';
COMMENT ON COLUMN "link_event_status"."divestment_status_type_valid_for_pedata_calculation" IS 'This is only one factor to determine a divesmtent record is valid for calculation of divestment.  Include IPO, Completed, Partial exit.  Exclude Pending Exit.';

-- CREATE INDEXES ...
ALTER TABLE "link_event_status" ADD CONSTRAINT "link_event_status_pkey" PRIMARY KEY ("id_event_status");

CREATE TABLE IF NOT EXISTS "link_fundingrd_cat_prefix_item"
 (
	"id_fundrdcateprefix"			SERIAL, 
	"fundingrd_cate_prefix"			VARCHAR (255), 
	"display fundingrd_cate_prefix"			VARCHAR (255), 
	"ranking of fundingrd_cate_prefix in msaccess"			DOUBLE PRECISION, 
	"note_internal"			VARCHAR (255), 
	"example"			VARCHAR (255), 
	"show item in dropdown list"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_fundingrd_cat_prefix_item" ADD CONSTRAINT "link_fundingrd_cat_prefix_item_pkey" PRIMARY KEY ("id_fundrdcateprefix");

CREATE TABLE IF NOT EXISTS "link_listed_co_status"
 (
	"id_listed_co_status"			SERIAL, 
	"info_type"			VARCHAR (255), 
	"db_related_module"			VARCHAR (255), 
	"listed_co_status_1"			VARCHAR (255), 
	"listed_co_status_2"			VARCHAR (255), 
	"listed_co_status_3"			VARCHAR (255), 
	"ranking_of_listed_co_status_ in_msaccess"			DOUBLE PRECISION, 
	"displayed_listed_co_status_in_databank_level_1"			VARCHAR (255), 
	"displayed_listed_co_status_in_databank_level_2"			VARCHAR (255), 
	"ranking_of_listed_co_status_ in_databank"			DOUBLE PRECISION, 
	"show_in_msaccess_menu_investmentdb"			BOOLEAN NOT NULL, 
	"show_in_msaccess_menu_divestdb"			BOOLEAN NOT NULL, 
	"example"			TEXT, 
	"note_internal"			TEXT
);
COMMENT ON COLUMN "link_listed_co_status"."info_type" IS 'eg Any, All, Investment, Exit';
COMMENT ON COLUMN "link_listed_co_status"."db_related_module" IS 'eg investeeInfo, investeeFundraisingRD, investorInfo, investorInvestRd, divestDB';
COMMENT ON COLUMN "link_listed_co_status"."listed_co_status_1" IS 'eg pending';
COMMENT ON COLUMN "link_listed_co_status"."listed_co_status_2" IS 'eg Completed, Pending completion (disclosed or officially announced previously)';

-- CREATE INDEXES ...
ALTER TABLE "link_listed_co_status" ADD CONSTRAINT "link_listed_co_status_pkey" PRIMARY KEY ("id_listed_co_status");

CREATE TABLE IF NOT EXISTS "link_staff"
 (
	"id_staff"			SERIAL, 
	"nickname"			VARCHAR (255), 
	"name_of_person"			VARCHAR (255), 
	"status"			VARCHAR (255), 
	"date_resign"			TIMESTAMP WITHOUT TIME ZONE, 
	"show item in dropdown list"			BOOLEAN NOT NULL, 
	"ranking of person in msaccess"			DOUBLE PRECISION, 
	"note_staff_name"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_staff" ADD CONSTRAINT "link_staff_pkey" PRIMARY KEY ("id_staff");

CREATE TABLE IF NOT EXISTS "link_valuation source"
 (
	"id_valuation source"			SERIAL, 
	"valuation source"			VARCHAR (255), 
	"ranking of valuation source in msaccess"			DOUBLE PRECISION, 
	"show to public?"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_valuation source" ADD CONSTRAINT "link_valuation source_pkey" PRIMARY KEY ("id_valuation source");

CREATE TABLE IF NOT EXISTS "old 20141124 link_country"
 (
	"id_country"			SERIAL, 
	"country (short form)"			VARCHAR (255), 
	"country (official long form)"			VARCHAR (255), 
	"displayed country in databank"			VARCHAR (255), 
	"displayed country region in databank level 1"			VARCHAR (255), 
	"ranking of country region in databank"			DOUBLE PRECISION, 
	"country region level 2"			VARCHAR (255), 
	"currency code"			VARCHAR (255), 
	"currency name"			VARCHAR (255), 
	"currency symbol"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "old 20141124 link_country_currency code_idx" ON "old 20141124 link_country" ("currency code");
ALTER TABLE "old 20141124 link_country" ADD CONSTRAINT "old 20141124 link_country_pkey" PRIMARY KEY ("id_country");

CREATE TABLE IF NOT EXISTS "valuation"
 (
	"id_valuation"			SERIAL, 
	"link_company id"			INTEGER, 
	"valuation record verification status (20130812)"			VARCHAR (255), 
	"transaction amount (for valuation) (us$ m)"			DOUBLE PRECISION, 
	"link_country id (local currency code)"			INTEGER, 
	"fx (one usd to lc)"			DOUBLE PRECISION, 
	"link_year id (year for valuation)"			INTEGER NOT NULL, 
	"link_month id (month for valuation)"			INTEGER NOT NULL, 
	"link_stage of invest id (for valuation)"			INTEGER NOT NULL, 
	"link_valuation record type id"			INTEGER NOT NULL, 
	"link_nature of sale id (for valuation)"			INTEGER, 
	"investor profile - local"			BOOLEAN NOT NULL, 
	"investor profile - asia"			BOOLEAN NOT NULL, 
	"investor profile - foreign"			BOOLEAN NOT NULL, 
	"investor profile - joint venture"			BOOLEAN NOT NULL, 
	"investor profile - syndication"			BOOLEAN NOT NULL, 
	"valuation_enterprise value (pre) (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_enterprise value assumption"			VARCHAR (255), 
	"valuation_adjustment from eqv to ev (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_equity value-pre (allfirmshares) (amt) (us$m)"			DOUBLE PRECISION, 
	"link_valuation_equity value-pre calculation basis id"			INTEGER NOT NULL, 
	"valuation_remark (company_pre)"			TEXT, 
	"valuation_revenue (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_revenue (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_revenue - source)"			INTEGER, 
	"valuation_ebitda (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_ebitda (loss with unknown amount)"			BOOLEAN NOT NULL, 
	"valuation_ebitda (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_ebitda - source)"			INTEGER, 
	"valuation_ebit (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_ebit (loss with unknown amount)"			BOOLEAN NOT NULL, 
	"valuation_ebit (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_ebit - source)"			INTEGER, 
	"valuation_earnings (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_earnings (loss with unknown amount)"			BOOLEAN NOT NULL, 
	"valuation_earnings (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_earnings - source)"			INTEGER, 
	"valuation_book value (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_book value (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_book value - source)"			INTEGER, 
	"valuation_remark (financial)"			TEXT, 
	"valuation_gross debt (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_gross debt over ebitda (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_gross debt - source)"			INTEGER, 
	"valuation_interest expense (amt) (us$m)"			DOUBLE PRECISION, 
	"valuation_interest expense (valuation) (ratio)"			DOUBLE PRECISION, 
	"link_valuation source id (val_interest expense - source)"			INTEGER, 
	"link_valuation investee stage id (val_investee stage)"			INTEGER, 
	"valuation_price premium (control)"			BOOLEAN NOT NULL, 
	"valuation_price premium (liquidity)"			BOOLEAN NOT NULL, 
	"capital structure _investment record"			BOOLEAN NOT NULL, 
	"capital structure _divestment record"			BOOLEAN NOT NULL, 
	"capital structure _refinance record"			BOOLEAN NOT NULL, 
	"capital structure _recapitalization record"			BOOLEAN NOT NULL, 
	"capital structure_enterprise value (post) (amt) (us$m)"			DOUBLE PRECISION, 
	"capital structure_equity value-post (amt) (allfirmshares) (us$m)"			DOUBLE PRECISION, 
	"capital structure_senior debt (amt) (us$m)"			DOUBLE PRECISION, 
	"capital structure_senior debt (tenure) (number of year)"			SMALLINT, 
	"capital structure_senior debt (tenure) (number of month)"			SMALLINT, 
	"capital structure_senior debt (coupon)"			VARCHAR (255), 
	"capital structure_subordinate debt (amt) (us$m)"			DOUBLE PRECISION, 
	"capital structure_subordinate debt (tenure) (number of year)"			SMALLINT, 
	"capital structure_subordinate debt (tenure) (number of month)"			SMALLINT, 
	"capital structure_subordinate debt (coupon)"			VARCHAR (255), 
	"capital structure_mezzanine (amt) (us$m)"			DOUBLE PRECISION, 
	"capital structure_mezzanine (tenure) (number of year)"			SMALLINT, 
	"capital structure_mezzanine (tenure) (number of month)"			SMALLINT, 
	"capital structure_mezzanine (coupon)"			VARCHAR (255), 
	"capital structure_others (amt) (us$m)"			DOUBLE PRECISION, 
	"capital structure_others (tenure) (number of year)"			SMALLINT, 
	"capital structure_others (tenure) (number of month)"			SMALLINT, 
	"capital structure_others (coupon)"			VARCHAR (255), 
	"capital structure_total debt (amt) (us$m)"			DOUBLE PRECISION, 
	"capital structure_remark"			TEXT, 
	"capital structure_leverage ratio (company) (debt percent)"			DOUBLE PRECISION, 
	"capital structure_leverage ratio (deal) (debt percent)"			DOUBLE PRECISION, 
	"(delete) capital structure_remark (leverage)"			TEXT, 
	"(delet)capital structure_mezz debt type (buyouts leveraged loan)"			BOOLEAN NOT NULL, 
	"(delet)capital structure_mezz debt type (recap/refin)"			BOOLEAN NOT NULL, 
	"(delet)capital structure_mezz debt type (growth)"			BOOLEAN NOT NULL, 
	"(delet)capital structure_mezz debt type(acquisitloan forbuyouts)"			BOOLEAN NOT NULL, 
	"(delet)capital structure_mezz debt type(acquisitloan forgrowth)"			BOOLEAN NOT NULL, 
	"(delet)capital structure_mezz financiertype(mezzaffiliates-bank)"			BOOLEAN NOT NULL, 
	"(delet)capital structure_mezz financiertype(fund mgt firm)"			BOOLEAN NOT NULL, 
	"date entered (valuation)"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_valuationdetail"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_valuationdetail"			VARCHAR (255), 
	"(temp) investee name"			VARCHAR (255), 
	"(temp) 2nd deal id"			VARCHAR (255), 
	"(temp) invest year"			VARCHAR (255), 
	"(temp) invest month"			VARCHAR (255)
);
COMMENT ON COLUMN "valuation"."valuation record verification status (20130812)" IS 'To check the existing valuation record in DB before 12 Aug 2013 on the using the Valuation Module in MsAccess (Last ID 3191 to 5489)';
COMMENT ON COLUMN "valuation"."link_year id (year for valuation)" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."link_month id (month for valuation)" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."link_stage of invest id (for valuation)" IS 'this field is added on 2015-01-07';
COMMENT ON COLUMN "valuation"."link_valuation record type id" IS 'this field is added on 2014-08-08';
COMMENT ON COLUMN "valuation"."link_nature of sale id (for valuation)" IS 'this field is added on 2015-06-16';
COMMENT ON COLUMN "valuation"."investor profile - local" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."investor profile - asia" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."investor profile - foreign" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."investor profile - joint venture" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."investor profile - syndication" IS 'Deal Details';
COMMENT ON COLUMN "valuation"."valuation_enterprise value (pre) (amt) (us$m)" IS 'Valuation Section (Enterprise Value - Pre)';
COMMENT ON COLUMN "valuation"."valuation_enterprise value assumption" IS 'Valuation Section (Enterprise Value - Pre)';
COMMENT ON COLUMN "valuation"."valuation_adjustment from eqv to ev (amt) (us$m)" IS '[Old name before 2015-07-02: Valuation_Net Debt (Amt) (US$m)] Valuation Section (Net Debt)';
COMMENT ON COLUMN "valuation"."valuation_equity value-pre (allfirmshares) (amt) (us$m)" IS 'Valuation Section (Equity Value - Pre)';
COMMENT ON COLUMN "valuation"."link_valuation_equity value-pre calculation basis id" IS 'Valuation Section (Equity Value - Pre)';
COMMENT ON COLUMN "valuation"."valuation_remark (company_pre)" IS 'Valuation Section';
COMMENT ON COLUMN "valuation"."valuation_revenue (amt) (us$m)" IS 'Valuation Section (Revenue)';
COMMENT ON COLUMN "valuation"."valuation_revenue (valuation) (ratio)" IS 'Valuation Section (Revenue) [EV/Revenue]';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_revenue - source)" IS 'Valuation Section (Revenue)';
COMMENT ON COLUMN "valuation"."valuation_ebitda (amt) (us$m)" IS 'Valuation Section (EBITDA)';
COMMENT ON COLUMN "valuation"."valuation_ebitda (loss with unknown amount)" IS 'Valuation Section (EBITDA)';
COMMENT ON COLUMN "valuation"."valuation_ebitda (valuation) (ratio)" IS 'Valuation Section (EBITDA) [EV/EBITDA]';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_ebitda - source)" IS 'Valuation Section (EBITDA)';
COMMENT ON COLUMN "valuation"."valuation_ebit (amt) (us$m)" IS 'Valuation Section (EBIT)';
COMMENT ON COLUMN "valuation"."valuation_ebit (loss with unknown amount)" IS 'Valuation Section (EBIT)';
COMMENT ON COLUMN "valuation"."valuation_ebit (valuation) (ratio)" IS 'Valuation Section (EBIT) [EV/EBIT]';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_ebit - source)" IS 'Valuation Section (EBIT)';
COMMENT ON COLUMN "valuation"."valuation_earnings (amt) (us$m)" IS 'Valuation Section (Earnings)';
COMMENT ON COLUMN "valuation"."valuation_earnings (loss with unknown amount)" IS 'Valuation Section (Earnings)';
COMMENT ON COLUMN "valuation"."valuation_earnings (valuation) (ratio)" IS 'Valuation Section (Earnings)';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_earnings - source)" IS 'Valuation Section (Earnings)';
COMMENT ON COLUMN "valuation"."valuation_book value (amt) (us$m)" IS 'Valuation Section (Book Value)';
COMMENT ON COLUMN "valuation"."valuation_book value (valuation) (ratio)" IS 'Valuation Section (Book Value) [Price Book]';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_book value - source)" IS 'Valuation Section (Book Value)';
COMMENT ON COLUMN "valuation"."valuation_remark (financial)" IS 'Valuation Section';
COMMENT ON COLUMN "valuation"."valuation_gross debt (amt) (us$m)" IS 'Valuation Section (Gross Debt)';
COMMENT ON COLUMN "valuation"."valuation_gross debt over ebitda (valuation) (ratio)" IS 'Valuation Section (Gross Debt over EBITDA) [Debts/EBITDA]';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_gross debt - source)" IS 'Valuation Section (Gross Debt)';
COMMENT ON COLUMN "valuation"."valuation_interest expense (amt) (us$m)" IS 'Valuation Section (Interest Expense)';
COMMENT ON COLUMN "valuation"."valuation_interest expense (valuation) (ratio)" IS 'Valuation Section (Interest Expense) [EBITDA/Interest Exp]';
COMMENT ON COLUMN "valuation"."link_valuation source id (val_interest expense - source)" IS 'Valuation Section (Interest Expense)';
COMMENT ON COLUMN "valuation"."link_valuation investee stage id (val_investee stage)" IS 'Valuation Section (this field is discontinued on 2015-01-07)';
COMMENT ON COLUMN "valuation"."valuation_price premium (control)" IS 'Valuation Section';
COMMENT ON COLUMN "valuation"."valuation_price premium (liquidity)" IS 'Valuation Section';
COMMENT ON COLUMN "valuation"."capital structure_enterprise value (post) (amt) (us$m)" IS 'Capital Structure Section (Enterprise Value - Post)';
COMMENT ON COLUMN "valuation"."capital structure_equity value-post (amt) (allfirmshares) (us$m)" IS 'Capital Structure Section (Equity Value - Post)';
COMMENT ON COLUMN "valuation"."capital structure_senior debt (amt) (us$m)" IS 'Capital Structure Section (Senior Debt)';
COMMENT ON COLUMN "valuation"."capital structure_senior debt (tenure) (number of year)" IS 'Capital Structure Section (Senior Debt)';
COMMENT ON COLUMN "valuation"."capital structure_senior debt (tenure) (number of month)" IS 'Capital Structure Section (Senior Debt)';
COMMENT ON COLUMN "valuation"."capital structure_senior debt (coupon)" IS 'Capital Structure Section (Senior Debt)';
COMMENT ON COLUMN "valuation"."capital structure_subordinate debt (amt) (us$m)" IS 'Capital Structure Section (Subordinate Debt)';
COMMENT ON COLUMN "valuation"."capital structure_subordinate debt (tenure) (number of year)" IS 'Capital Structure Section (Subordinate Debt)';
COMMENT ON COLUMN "valuation"."capital structure_subordinate debt (tenure) (number of month)" IS 'Capital Structure Section (Subordinate Debt)';
COMMENT ON COLUMN "valuation"."capital structure_subordinate debt (coupon)" IS 'Capital Structure Section (Subordinate Debt)';
COMMENT ON COLUMN "valuation"."capital structure_mezzanine (amt) (us$m)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."capital structure_mezzanine (tenure) (number of year)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."capital structure_mezzanine (tenure) (number of month)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."capital structure_mezzanine (coupon)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."capital structure_others (amt) (us$m)" IS 'Capital Structure Section (Others)';
COMMENT ON COLUMN "valuation"."capital structure_others (tenure) (number of year)" IS 'Capital Structure Section (Others)';
COMMENT ON COLUMN "valuation"."capital structure_others (tenure) (number of month)" IS 'Capital Structure Section (Others)';
COMMENT ON COLUMN "valuation"."capital structure_others (coupon)" IS 'Capital Structure Section (Others)';
COMMENT ON COLUMN "valuation"."capital structure_total debt (amt) (us$m)" IS 'Capital Structure Section (Total Debt)';
COMMENT ON COLUMN "valuation"."capital structure_remark" IS 'Capital Structure Section';
COMMENT ON COLUMN "valuation"."capital structure_leverage ratio (company) (debt percent)" IS 'Capital Structure Section (Leverage Ratio)';
COMMENT ON COLUMN "valuation"."capital structure_leverage ratio (deal) (debt percent)" IS 'Capital Structure Section (Leverage Ratio)';
COMMENT ON COLUMN "valuation"."(delete) capital structure_remark (leverage)" IS 'Capital Structure Section (Leverage Ratio)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz debt type (buyouts leveraged loan)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz debt type (recap/refin)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz debt type (growth)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz debt type(acquisitloan forbuyouts)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz debt type(acquisitloan forgrowth)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz financiertype(mezzaffiliates-bank)" IS 'Capital Structure Section (Mezzanine)';
COMMENT ON COLUMN "valuation"."(delet)capital structure_mezz financiertype(fund mgt firm)" IS 'Capital Structure Section (Mezzanine)';

-- CREATE INDEXES ...
CREATE INDEX "valuation_(temp) 2nd deal id_idx" ON "valuation" ("(temp) 2nd deal id");
CREATE INDEX "valuation_link_company id_idx" ON "valuation" ("link_company id");
CREATE INDEX "valuation_link_valuation record type id_idx" ON "valuation" ("link_valuation record type id");
CREATE INDEX "valuation_link_valuation_equity value calculation basis id_idx" ON "valuation" ("link_valuation_equity value-pre calculation basis id");
ALTER TABLE "valuation" ADD CONSTRAINT "valuation_pkey" PRIMARY KEY ("id_valuation");


-- CREATE Relationships ...
-- Relationship from "Fund Invest in Deal" ("2nd deal id") to "2nd deal for a company"("2nd deal id") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("2nd deal id") to "Auxilliary Service Providers"("2nd deal id") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("id") to "Company"("id") does not enforce integrity.
-- Relationship from "contact" ("id") to "Company"("id") does not enforce integrity.
-- Relationship from "Valuation" ("link_company id") to "Company"("id") does not enforce integrity.
-- Relationship from "Financier financing info" ("link_financier id (financier for valuation)") to "Financier Name"("id_financier_name") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("2nd deal id") to "Investor Invest Round"("link_investment round id") does not enforce integrity.
ALTER TABLE "Investor Name" ADD CONSTRAINT "investor name_link_latest_investor_name_group id_fk" FOREIGN KEY ("link_latest_investor_name_group id") REFERENCES "Investor Name (Latest Name Group)"("id_latest_investor_name_group") DEFERRABLE INITIALLY IMMEDIATE;
-- Relationship from "Investor Geo Focus Type" ("link_investor_name_id") to "Investor Name"("id_investor_name") does not enforce integrity.
-- Relationship from "Investor Invest Company (Valuation)" ("link_investor id (investor for calculation of valuation)") to "Investor Name"("id_investor_name") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("2nd deal id") to "Keyword for Deal"("link_investment round id") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_country id (investee location at investment date)") to "Link_Country"("id_country") does not enforce integrity.
-- Relationship from "Auxilliary Service Providers" ("link_country id (auxservprovider location)") to "(Old 20130624) Link_Country"("id_country") does not enforce integrity.
-- Relationship from "Company" ("link_country id (investee location)") to "(Old 20130624) Link_Country"("id_country") does not enforce integrity.
-- Relationship from "Financier Name" ("link_country id (financier headquarter location)") to "old 20141124 Link_Country"("id_country") does not enforce integrity.
-- Relationship from "Investor Name" ("link_country id (investor location)") to "old 20141124 Link_Country"("id_country") does not enforce integrity.
-- Relationship from "Investor Name (Latest Name Group)" ("link_country id (investor headquarter location)") to "old 20141124 Link_Country"("id_country") does not enforce integrity.
-- Relationship from "Valuation" ("link_country id (local currency code)") to "old 20141124 Link_Country"("id_country") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_credit finance type id") to "Link_Credit Finance Type"("id_credit finance type") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_data source id (deal info - source)") to "Link_Data Source"("id_data source") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_data source id (deal size - source)") to "Link_Data Source"("id_data source") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_data source id (equity stake - source)") to "Link_Data Source"("id_data source") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_data source id (fail deal - source)") to "Link_Data Source"("id_data source") does not enforce integrity.
-- Relationship from "Fund Invest in Deal" ("link_data source id (fund invest info - source)") to "Link_Data Source"("id_data source") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_deal nature id") to "Link_Deal Nature"("id_deal nature") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_exit status id (displayed exit status)") to "Link_Exit Status"("id_exit status") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_fail reason id (fail deal reason)") to "Link_Fail Reason"("id_fail reason") does not enforce integrity.
-- Relationship from "Investor Invest Company (Valuation)" ("link_fund category id (fund category for valuation)") to "Link_Fund Category"("id_fund category") does not enforce integrity.
-- Relationship from "Investor Invest Company (Valuation)" ("link_fund geo focus (fund geo focus for valuation)") to "Link_Fund Geo Focus"("id_fund geo focus") does not enforce integrity.
-- Relationship from "Investor Geo Focus Type" ("id_investor_geo focus type") to "Link_Geo Focus Type"("id_geo focus type") does not enforce integrity.
-- Relationship from "Company" ("link_industry id") to "Link_Industry"("id_industry") does not enforce integrity.
-- Relationship from "Investor Invest Round" ("link_investor profile id") to "Link_Investor Profile"("id_investor profile") does not enforce integrity.
-- Relationship from "Investor Name" ("link_investor type id (investor type)") to "Link_Investor Type"("id_investor type") does not enforce integrity.
-- Relationship from "Keyword for Deal" ("link_keyword category id") to "Link_Keyword Category"("id_keyword category") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_month id (invest month)") to "Link_Month"("id_month") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_month id (fail month)") to "Link_Month"("id_month") does not enforce integrity.
-- Relationship from "Company" ("link_month id (investee established month)") to "Link_Month"("id_month") does not enforce integrity.
-- Relationship from "Valuation" ("link_month id (month for valuation)") to "Link_Month"("id_month") does not enforce integrity.
-- Relationship from "Valuation" ("link_nature of sale id (for valuation)") to "Link_Nature of Sale"("id_nature of sale") does not enforce integrity.
-- Relationship from "Investor Name" ("link_note_item_id_firm_name_note") to "Link_note_item"("id_note_cate") does not enforce integrity.
-- Relationship from "Company" ("link_sri focus id") to "Link_SRI Focus"("id_sri focus") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_stage of invest id") to "Link_Stage of Invest"("id_stage of invest") does not enforce integrity.
-- Relationship from "Valuation" ("link_stage of invest id (for valuation)") to "Link_Stage of Invest"("id_stage of invest") does not enforce integrity.
-- Relationship from "Valuation" ("link_stage of invest id (for valuation)") to "Link_Stage of Invest"("id_stage of invest") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_tech deal category id") to "Link_Tech Deal Category"("id_tech deal category") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation investee stage id (val_investee stage)") to "Link_Valuation Investee Stage"("id_valuation investee stage") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation record type id") to "old 20141124 Link_Valuation Record Type"("id_valuation record type") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation record type id") to "Link_Valuation Record Type"("id_valuation record type") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_revenue - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_ebitda - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_ebit - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_earnings - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_book value - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_gross debt - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation source id (val_interest expense - source)") to "Link_Valuation Source"("id_valuation source") does not enforce integrity.
-- Relationship from "Valuation" ("link_valuation_equity value-pre calculation basis id") to "Link_Valuation_Equity Value Calculation Basis"("id_valuation_equity value calculation basis") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_year id (invest year)") to "Link_Year"("id_year") does not enforce integrity.
-- Relationship from "2nd deal for a company" ("link_year id (fail year)") to "Link_Year"("id_year") does not enforce integrity.
-- Relationship from "Company" ("link_year id (investee established year)") to "Link_Year"("id_year") does not enforce integrity.
-- Relationship from "Valuation" ("link_year id (year for valuation)") to "Link_Year"("id_year") does not enforce integrity.
ALTER TABLE "MSysNavPaneGroups" ADD CONSTRAINT "msysnavpanegroups_groupcategoryid_fk" FOREIGN KEY ("groupcategoryid") REFERENCES "MSysNavPaneGroupCategories"("id") ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "MSysNavPaneGroupToObjects" ADD CONSTRAINT "msysnavpanegrouptoobjects_groupid_fk" FOREIGN KEY ("groupid") REFERENCES "MSysNavPaneGroups"("id") ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
-- Relationship from "2nd deal for a company" ("link_valuation record id") to "Valuation"("id_valuation") does not enforce integrity.
-- Relationship from "Financier financing info" ("link_valuation record id") to "Valuation"("id_valuation") does not enforce integrity.
-- Relationship from "Investor Invest Company (Valuation)" ("link_valuation record id") to "Valuation"("id_valuation") does not enforce integrity.
-- ----------------------------------------------------------
-- MDB Tools - A library for reading MS Access database files
-- Copyright (C) 2000-2011 Brian Bruns and others.
-- Files in libmdb are licensed under LGPL and the utilities under
-- the GPL, see COPYING.LIB and COPYING files respectively.
-- Check out http://mdbtools.sourceforge.net
-- ----------------------------------------------------------

SET client_encoding = 'UTF-8';

CREATE TABLE IF NOT EXISTS "contact"
 (
	"contact id"			SERIAL, 
	"institution id"			INTEGER NOT NULL, 
	"mr/ms"			VARCHAR (20), 
	"first name"			VARCHAR (25), 
	"initial"			VARCHAR (3), 
	"last name"			VARCHAR (25), 
	"ch: mr_ms"			VARCHAR (35), 
	"ch: firstname"			VARCHAR (25), 
	"ch: lastname"			VARCHAR (25), 
	"position"			VARCHAR (100), 
	"ch: position"			VARCHAR (60), 
	"e-mail address_contact"			VARCHAR (90), 
	"phone 1 (contact_direct_tel)"			VARCHAR (25), 
	"phone 1 extension"			VARCHAR (8), 
	"phone 2 (contact_mobile)"			VARCHAR (25), 
	"phone 2 extension"			VARCHAR (8), 
	"fax no (contact_direct_fax)"			VARCHAR (60), 
	"ranking in dir"			REAL, 
	"news flash subscriber"			VARCHAR (50), 
	"date entered_contact"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_contact"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_contact"			VARCHAR (255), 
	"contact show in directory"			BOOLEAN NOT NULL, 
	"email show in directory"			BOOLEAN NOT NULL, 
	"date of verification_contact"			TIMESTAMP WITHOUT TIME ZONE, 
	"person handled_contact"			VARCHAR (255), 
	"verification status_contact"			VARCHAR (255), 
	"info from kn_contact"			BOOLEAN NOT NULL, 
	"remarks_verification_contact"			TEXT, 
	"potential subscriber"			VARCHAR (255)
);
COMMENT ON COLUMN "contact"."institution id" IS 'Institution Code must be the same as in Institution Database';
COMMENT ON COLUMN "contact"."mr/ms" IS 'Mr;Mrs;Ms';
COMMENT ON COLUMN "contact"."news flash subscriber" IS 'Exclude from News Flash (;Exclude from NF - Fail Email;Exclude from NF - UNSUBSCRIBE)';
COMMENT ON COLUMN "contact"."date entered_contact" IS 'Date of this record entered';
COMMENT ON COLUMN "contact"."lastmodified_contact" IS 'Date of this record updated';
COMMENT ON COLUMN "contact"."contact show in directory" IS 'Contact show in Directory?';
COMMENT ON COLUMN "contact"."email show in directory" IS 'Email show in Directory?';
COMMENT ON COLUMN "contact"."date of verification_contact" IS 'Date of the II Verification (Contact)';
COMMENT ON COLUMN "contact"."person handled_contact" IS 'The last person who done the verification (Contact)';
COMMENT ON COLUMN "contact"."verification status_contact" IS 'The status of verification (Contact)';
COMMENT ON COLUMN "contact"."info from kn_contact" IS 'Contact Information provided by KN';
COMMENT ON COLUMN "contact"."remarks_verification_contact" IS 'Remarks_Verification (Contact)';
COMMENT ON COLUMN "contact"."potential subscriber" IS 'Potential Subscriber?';

-- CREATE INDEXES ...
CREATE UNIQUE INDEX "contact_contact id_idx" ON "contact" ("contact id");
CREATE INDEX "contact_institution id_idx" ON "contact" ("institution id");

CREATE TABLE IF NOT EXISTS "factiva_data"
 (
	"institution id"			INTEGER NOT NULL, 
	"in factiva?"			VARCHAR (50), 
	"remarks"			VARCHAR (100), 
	"date entered"			TIMESTAMP WITHOUT TIME ZONE, 
	"last updated"			TIMESTAMP WITHOUT TIME ZONE
);

-- CREATE INDEXES ...
CREATE INDEX "factiva_data_institution id_idx" ON "factiva_data" ("institution id");

CREATE TABLE IF NOT EXISTS "fund"
 (
	"fund id"			VARCHAR (50) NOT NULL, 
	"fund name"			VARCHAR (150), 
	"displayed fund name"			VARCHAR (150), 
	"fund name (chinese)"			VARCHAR (50), 
	"displayed fund name (chinese)"			VARCHAR (50), 
	"first pe fund of this firm?"			BOOLEAN NOT NULL, 
	"fund mgt company"			VARCHAR (150), 
	"displayed fund mgt company"			VARCHAR (150), 
	"fund mgt company (chinese)"			VARCHAR (100), 
	"displayed fund mgt company (chinese)"			VARCHAR (100), 
	"record for ii invest in fund mgt co"			BOOLEAN NOT NULL, 
	"independent fund management firm?"			BOOLEAN NOT NULL, 
	"corporate venture fund"			BOOLEAN NOT NULL, 
	"pe_firm_category"			VARCHAR (50), 
	"link_fund nature of firm_id"			INTEGER, 
	"mgt co country"			VARCHAR (30), 
	"fund inception date (mm/yy)"			VARCHAR (35), 
	"link_fund category_id"			INTEGER, 
	"sub-fund category"			VARCHAR (200), 
	"link_fund geo focus_id"			INTEGER, 
	"sub-geographic focus"			VARCHAR (200), 
	"fund life (number of year)"			VARCHAR (20), 
	"fund life (extension) (if applicable)"			VARCHAR (20), 
	"date of maturity (yyyymm)"			VARCHAR (10), 
	"fund vintage year (yyyymm)"			VARCHAR (10), 
	"shareholder structure fund?"			BOOLEAN NOT NULL, 
	"captive fund?"			BOOLEAN NOT NULL, 
	"evergreen fund?"			BOOLEAN NOT NULL, 
	"industrial fund?"			BOOLEAN NOT NULL, 
	"shariah-compliant fund?"			BOOLEAN NOT NULL, 
	"government sponsored fund?"			BOOLEAN NOT NULL, 
	"multilateral organisation sponsored fund?"			BOOLEAN NOT NULL, 
	"high net worth individuals sponsored fund?"			BOOLEAN NOT NULL, 
	"founding partner sponsored fund?"			BOOLEAN NOT NULL, 
	"fund status (inactive)"			VARCHAR (50), 
	"displayed fund status (inactive)"			VARCHAR (50), 
	"minimumtarget fund size (us$m)"			REAL, 
	"maximumtarget fund size (us$m)"			REAL, 
	"target fund size currency  (local currency code)"			VARCHAR (3), 
	"minimum target fund size (in local currency)"			REAL, 
	"maximum target fund size (in local currency)"			REAL, 
	"checked"			BOOLEAN NOT NULL, 
	"do not disclose (fund)"			VARCHAR (50), 
	"fund remarks"			TEXT, 
	"fund shown in directory"			VARCHAR (55), 
	"link_fund industries focus_id"			INTEGER, 
	"link_fund sri focus_id"			INTEGER, 
	"fund shown in databank"			VARCHAR (55), 
	"fund shown in databank (trial version)"			VARCHAR (55), 
	"link_local currency fund_id"			INTEGER, 
	"date entered_fund"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fund"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fund"			VARCHAR (255), 
	"oversubscribed/hard-cap funds?"			BOOLEAN NOT NULL, 
	"corporate venturing fund"			BOOLEAN NOT NULL, 
	"capital deployed (us$m)"			REAL, 
	"capital available (us$m)"			REAL, 
	"date of capital available (yyyymm)"			VARCHAR (255), 
	"separate account"			BOOLEAN NOT NULL, 
	"link_fund size range_id"			INTEGER, 
	"long term fund?"			BOOLEAN NOT NULL, 
	"thematic funds"			BOOLEAN NOT NULL, 
	"sri funds"			BOOLEAN NOT NULL, 
	"parallel/co-investment funds"			BOOLEAN NOT NULL, 
	"small & mid-cap funds"			BOOLEAN NOT NULL, 
	"fully liquidated"			BOOLEAN NOT NULL, 
	"fully liquidated year"			VARCHAR (10), 
	"continuation fund"			BOOLEAN NOT NULL, 
	"mid-market fund"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "fund"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund"."fund name" IS 'Fund Name';
COMMENT ON COLUMN "fund"."displayed fund name" IS 'Displayed Fund Name';
COMMENT ON COLUMN "fund"."fund name (chinese)" IS 'Fund Name (Chinese)';
COMMENT ON COLUMN "fund"."displayed fund name (chinese)" IS 'Displayed Fund Name (Chinese)';
COMMENT ON COLUMN "fund"."first pe fund of this firm?" IS 'Is this fund the first Private Equity fund of this firm?';
COMMENT ON COLUMN "fund"."fund mgt company" IS 'Fund Mgt Company Name';
COMMENT ON COLUMN "fund"."displayed fund mgt company" IS 'Displayed Fund Mgt Company';
COMMENT ON COLUMN "fund"."fund mgt company (chinese)" IS 'Fund Mgt Company Name (Chinese)';
COMMENT ON COLUMN "fund"."displayed fund mgt company (chinese)" IS 'Displayed Fund Mgt Company (Chinese)';
COMMENT ON COLUMN "fund"."record for ii invest in fund mgt co" IS 'II Invests in Fund Mgt Firm';
COMMENT ON COLUMN "fund"."independent fund management firm?" IS 'Is the firm an independent Fund Management Firm?';
COMMENT ON COLUMN "fund"."corporate venture fund" IS 'Is the firm a Corporate Venture Fund?';
COMMENT ON COLUMN "fund"."pe_firm_category" IS 'Local, Foreign or Joint Venture';
COMMENT ON COLUMN "fund"."link_fund nature of firm_id" IS 'Nature of Firm?';
COMMENT ON COLUMN "fund"."mgt co country" IS 'Fund Mgt Company Location in Country';
COMMENT ON COLUMN "fund"."fund inception date (mm/yy)" IS 'Fund Inception Date (mm/yy)';
COMMENT ON COLUMN "fund"."link_fund category_id" IS 'Fund Category';
COMMENT ON COLUMN "fund"."sub-fund category" IS 'Sub-Fund Category (if applicable)';
COMMENT ON COLUMN "fund"."link_fund geo focus_id" IS 'Fund Geo Focus';
COMMENT ON COLUMN "fund"."sub-geographic focus" IS 'Sub-Geographic focus (use only when the Geographic Focus is not appropriate)';
COMMENT ON COLUMN "fund"."fund life (number of year)" IS 'Fund Life (in number of year format)';
COMMENT ON COLUMN "fund"."fund life (extension) (if applicable)" IS 'Fund Life (extension) (if applicable) (in number of additional year)';
COMMENT ON COLUMN "fund"."date of maturity (yyyymm)" IS 'Date of Maturity (yyyymm)';
COMMENT ON COLUMN "fund"."fund vintage year (yyyymm)" IS 'Fund Vintage Year (yyyymm)';
COMMENT ON COLUMN "fund"."shareholder structure fund?" IS 'Shareholder Structure Fund?';
COMMENT ON COLUMN "fund"."captive fund?" IS 'Captive Fund?';
COMMENT ON COLUMN "fund"."evergreen fund?" IS 'Evergreen Fund?';
COMMENT ON COLUMN "fund"."industrial fund?" IS 'Industrial Fund?';
COMMENT ON COLUMN "fund"."shariah-compliant fund?" IS 'Shariah-compliant Fund?';
COMMENT ON COLUMN "fund"."government sponsored fund?" IS 'Government Sponsored Fund?';
COMMENT ON COLUMN "fund"."multilateral organisation sponsored fund?" IS 'Multilateral Organisation Sponsored Fund?';
COMMENT ON COLUMN "fund"."high net worth individuals sponsored fund?" IS 'Is the fund largely subscribed by individual investors or High Net Worth Individuals?';
COMMENT ON COLUMN "fund"."founding partner sponsored fund?" IS 'Founding Partner Sponsored Fund?';
COMMENT ON COLUMN "fund"."fund status (inactive)" IS 'Fund Raising Status';
COMMENT ON COLUMN "fund"."displayed fund status (inactive)" IS 'Displayed Fund Raising Status';
COMMENT ON COLUMN "fund"."minimumtarget fund size (us$m)" IS 'MinimumTarget Fund Size (US$m)';
COMMENT ON COLUMN "fund"."maximumtarget fund size (us$m)" IS 'MaximumTarget Fund Size (US$m)';
COMMENT ON COLUMN "fund"."target fund size currency  (local currency code)" IS 'Target Fund Size (Local currency code)';
COMMENT ON COLUMN "fund"."minimum target fund size (in local currency)" IS 'Minimum Target Fund Size (in Local Currency)';
COMMENT ON COLUMN "fund"."maximum target fund size (in local currency)" IS 'Maximum Target Fund Size (in Local Currency)';
COMMENT ON COLUMN "fund"."checked" IS 'Checked By Alan Chan before';
COMMENT ON COLUMN "fund"."do not disclose (fund)" IS 'Do NOT Disclose this fund  (Request by the Fund House or Request by KN)';
COMMENT ON COLUMN "fund"."fund remarks" IS 'Fund Remarks';
COMMENT ON COLUMN "fund"."fund shown in directory" IS 'Fund Shown in Directory?';
COMMENT ON COLUMN "fund"."link_fund industries focus_id" IS 'Fund Industries Focus';
COMMENT ON COLUMN "fund"."link_fund sri focus_id" IS 'Fund SRI Focus';
COMMENT ON COLUMN "fund"."fund shown in databank" IS 'Fund Shown in Databank?';
COMMENT ON COLUMN "fund"."fund shown in databank (trial version)" IS 'Trial Verson in Databank?';
COMMENT ON COLUMN "fund"."link_local currency fund_id" IS 'Local Currency Fund?';
COMMENT ON COLUMN "fund"."date entered_fund" IS 'Date of the record entered';
COMMENT ON COLUMN "fund"."lastmodified_fund" IS 'Date of the information of this Fund record last updated';
COMMENT ON COLUMN "fund"."oversubscribed/hard-cap funds?" IS 'Oversubscribed/Hard-Cap Funds?';
COMMENT ON COLUMN "fund"."corporate venturing fund" IS 'Is the firm a Corporate Venturing Fund?';
COMMENT ON COLUMN "fund"."capital deployed (us$m)" IS 'Capital Deployed (US$m)(as of latest Date Recorded)';
COMMENT ON COLUMN "fund"."capital available (us$m)" IS 'Capital Available (US$m)(as of latest Date Recorded)';
COMMENT ON COLUMN "fund"."date of capital available (yyyymm)" IS 'Date of Capital Available (yyyymm)(as of latest Date Recorded)';
COMMENT ON COLUMN "fund"."separate account" IS 'Is the fund a Separate Account?';
COMMENT ON COLUMN "fund"."link_fund size range_id" IS 'Fund Size Range';
COMMENT ON COLUMN "fund"."long term fund?" IS 'Long Term Fund?';
COMMENT ON COLUMN "fund"."thematic funds" IS 'Thematic Funds';
COMMENT ON COLUMN "fund"."sri funds" IS 'SRI Funds';
COMMENT ON COLUMN "fund"."parallel/co-investment funds" IS 'Is the fund a Parallel/Co-Investment Fund?';
COMMENT ON COLUMN "fund"."small & mid-cap funds" IS 'Small & Mid-Cap Funds';
COMMENT ON COLUMN "fund"."fully liquidated" IS 'Fully Liquidated';
COMMENT ON COLUMN "fund"."fully liquidated year" IS 'Fully Liquidated Year';
COMMENT ON COLUMN "fund"."continuation fund" IS 'Is the fund a Continuation Fund?';
COMMENT ON COLUMN "fund"."mid-market fund" IS 'Is the fund a Mid-Market Fund?';

-- CREATE INDEXES ...
ALTER TABLE "fund" ADD CONSTRAINT "fund_pkey" PRIMARY KEY ("fund id");

CREATE TABLE IF NOT EXISTS "fund - aper (monthly) reported"
 (
	"fund id"			VARCHAR (50) NOT NULL, 
	"link to fund - aper (monthly) publication"			VARCHAR (50), 
	"link to aper (monthly) edition"			VARCHAR (50), 
	"old - link to aper (monthly) edition"			VARCHAR (20), 
	"date entered"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "fund - aper (monthly) reported"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - aper (monthly) reported"."link to fund - aper (monthly) publication" IS 'Reported in which APER Monthly Publication (ie APER-Eng or APER-GC';
COMMENT ON COLUMN "fund - aper (monthly) reported"."link to aper (monthly) edition" IS 'Reported in which issue of the APER Monthly Publication';
COMMENT ON COLUMN "fund - aper (monthly) reported"."date entered" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - aper (monthly) reported_fund id_idx" ON "fund - aper (monthly) reported" ("fund id");

CREATE TABLE IF NOT EXISTS "fund - aper edition"
 (
	"fund id"			VARCHAR (50) NOT NULL, 
	"aper edition"			VARCHAR (50), 
	"date entered"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "fund - aper edition"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - aper edition"."aper edition" IS 'To be include in which issue of the APER Mid-year or Year-end';
COMMENT ON COLUMN "fund - aper edition"."date entered" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - aper edition_fund id_idx" ON "fund - aper edition" ("fund id");

CREATE TABLE IF NOT EXISTS "fund - aper_monthly_edition"
 (
	"old - aper (monthly) edition"			TIMESTAMP WITHOUT TIME ZONE, 
	"date entered"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "fund - aper_monthly_edition"."date entered" IS 'Date of this record entered';

-- CREATE INDEXES ...

CREATE TABLE IF NOT EXISTS "fund - aper_monthly_publication"
 (
	"aper (monthly) publication"			VARCHAR (50)
);
COMMENT ON COLUMN "fund - aper_monthly_publication"."aper (monthly) publication" IS 'Type of APER Publication';

-- CREATE INDEXES ...

CREATE TABLE IF NOT EXISTS "fund - capital available record"
 (
	"fund_capital_available_id"			SERIAL, 
	"fund id"			VARCHAR (50) NOT NULL, 
	"date (yyyymm)"			VARCHAR (20), 
	"capital deployed (us$ m)"			REAL, 
	"capital available/dry powder (us$ m)"			REAL, 
	"capital available currency (local currency)"			VARCHAR (3), 
	"capital deployed (lc m)"			REAL, 
	"capital available/dry powder (lc m)"			REAL, 
	"information source"			VARCHAR (30), 
	"do not disclose (fund raising activity)"			VARCHAR (50), 
	"date entered_capital available_record"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "fund - capital available record"."fund_capital_available_id" IS 'Fund_Capital_Available_ID';
COMMENT ON COLUMN "fund - capital available record"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - capital available record"."date (yyyymm)" IS 'Date of Recording';
COMMENT ON COLUMN "fund - capital available record"."capital deployed (us$ m)" IS 'Capital Deployed (US$ m)';
COMMENT ON COLUMN "fund - capital available record"."capital available/dry powder (us$ m)" IS 'Capital Available/Dry Powder (US$ m)';
COMMENT ON COLUMN "fund - capital available record"."capital available currency (local currency)" IS 'Capital Available Currency (Local currency)';
COMMENT ON COLUMN "fund - capital available record"."capital deployed (lc m)" IS 'Capital Deployed (LC m)';
COMMENT ON COLUMN "fund - capital available record"."capital available/dry powder (lc m)" IS 'Capital Available/Dry Powder (LC m)';
COMMENT ON COLUMN "fund - capital available record"."information source" IS 'Source of information';
COMMENT ON COLUMN "fund - capital available record"."do not disclose (fund raising activity)" IS 'Do NOT disclose the fund raising activity only (request by the Fund House or Request by KN)';
COMMENT ON COLUMN "fund - capital available record"."date entered_capital available_record" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - capital available record_fund id_idx" ON "fund - capital available record" ("fund id");
CREATE UNIQUE INDEX "fund - capital available record_fund_raising_record_id_idx" ON "fund - capital available record" ("fund_capital_available_id");

CREATE TABLE IF NOT EXISTS "fund - expected date of fund raising"
 (
	"fund id"			VARCHAR (50) NOT NULL, 
	"date expected (yyyymm)"			VARCHAR (20), 
	"event"			VARCHAR (50), 
	"date entered_expected_fund_raising_rate"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_expected_fund_raising_rate"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ii_expected_fund_raising_rate"			VARCHAR (255)
);
COMMENT ON COLUMN "fund - expected date of fund raising"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - expected date of fund raising"."date expected (yyyymm)" IS 'Date Expected (yyyymm) of the fund raising activity';
COMMENT ON COLUMN "fund - expected date of fund raising"."event" IS 'Event (Date expected to launch, 1st, 2nd, or Final closing)';
COMMENT ON COLUMN "fund - expected date of fund raising"."date entered_expected_fund_raising_rate" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - expected date of fund raising_fund id_idx" ON "fund - expected date of fund raising" ("fund id");

CREATE TABLE IF NOT EXISTS "fund - fund lp summary"
 (
	"fund lp summary id"			SERIAL, 
	"fund id"			VARCHAR (50) NOT NULL, 
	"link_fund lp level id category id"			INTEGER, 
	"country"			INTEGER, 
	"date enteredlastmodified_fund lp level"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "fund - fund lp summary"."fund lp summary id" IS 'Fund LP Summary ID';
COMMENT ON COLUMN "fund - fund lp summary"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - fund lp summary"."link_fund lp level id category id" IS 'Fund LP Level Category';
COMMENT ON COLUMN "fund - fund lp summary"."country" IS 'Country';
COMMENT ON COLUMN "fund - fund lp summary"."date enteredlastmodified_fund lp level" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - fund lp summary_fund id_idx" ON "fund - fund lp summary" ("fund id");
ALTER TABLE "fund - fund lp summary" ADD CONSTRAINT "fund - fund lp summary_pkey" PRIMARY KEY ("fund lp summary id");

CREATE TABLE IF NOT EXISTS "fund - fund management structure"
 (
	"fund management structure id"			SERIAL, 
	"fund id"			VARCHAR (50) NOT NULL, 
	"link_fund management level category id"			INTEGER, 
	"link_fund management level country id"			INTEGER, 
	"date enteredlastmodified_fund management level"			TIMESTAMP WITHOUT TIME ZONE
);
COMMENT ON COLUMN "fund - fund management structure"."fund management structure id" IS 'Fund Management Structure ID';
COMMENT ON COLUMN "fund - fund management structure"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - fund management structure"."link_fund management level category id" IS 'Fund Management Level Category';
COMMENT ON COLUMN "fund - fund management structure"."link_fund management level country id" IS 'Fund Management Level Country';
COMMENT ON COLUMN "fund - fund management structure"."date enteredlastmodified_fund management level" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - fund management structure_fund id_idx" ON "fund - fund management structure" ("fund id");
ALTER TABLE "fund - fund management structure" ADD CONSTRAINT "fund - fund management structure_pkey" PRIMARY KEY ("fund management structure id");

CREATE TABLE IF NOT EXISTS "fund - fund raising record"
 (
	"fund_raising_record_id"			SERIAL, 
	"fund id"			VARCHAR (50) NOT NULL, 
	"date of fund raised (yyyymm)"			VARCHAR (20), 
	"round of closing"			VARCHAR (50), 
	"net fund raising amount (us$ m)"			REAL, 
	"accumulated fund raising amount (us$ m)"			REAL, 
	"accumulated fund raising amount shown in databank (usd)"			VARCHAR (255), 
	"fund raising currency (local currency)"			VARCHAR (3), 
	"net fund raising amount (lc m)"			REAL, 
	"accumulated fund raising amount (lc m)"			REAL, 
	"information source"			VARCHAR (30), 
	"do not disclose (fund raising activity)"			VARCHAR (50), 
	"fund raising record shown in directory"			VARCHAR (50), 
	"fund raising record exclude from calculation"			VARCHAR (50), 
	"fund raising record exclude from calculation (by vintage year)"			VARCHAR (50), 
	"(old 20110629) fund raising record shown in databank"			VARCHAR (50), 
	"link_fund raising record shown in databank_id"			INTEGER, 
	"fund raising record shown in databank (trial version)"			VARCHAR (50), 
	"date enteredlastmodified_fund_raise_record"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fund_raise_record"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fund_raise_record"			VARCHAR (255)
);
COMMENT ON COLUMN "fund - fund raising record"."fund_raising_record_id" IS 'Fund_Raising_Record_ID';
COMMENT ON COLUMN "fund - fund raising record"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - fund raising record"."date of fund raised (yyyymm)" IS 'Date of Closing';
COMMENT ON COLUMN "fund - fund raising record"."round of closing" IS 'Information of this round of funding (eg, 1st, 2nd, Final, amount committed only, downsizing or adjustment)';
COMMENT ON COLUMN "fund - fund raising record"."net fund raising amount (us$ m)" IS 'Net Closing Amount (US$ m)';
COMMENT ON COLUMN "fund - fund raising record"."accumulated fund raising amount (us$ m)" IS 'Accumulated Closing Amount (US$ m)';
COMMENT ON COLUMN "fund - fund raising record"."accumulated fund raising amount shown in databank (usd)" IS 'Accumulated Fund Raising Amount Shown in Databank (USD)?';
COMMENT ON COLUMN "fund - fund raising record"."fund raising currency (local currency)" IS 'Fund raising Currency';
COMMENT ON COLUMN "fund - fund raising record"."net fund raising amount (lc m)" IS 'Net Closing Amount (LC) (in million)';
COMMENT ON COLUMN "fund - fund raising record"."accumulated fund raising amount (lc m)" IS 'Accumulated Closing Amount (LC) (in million)';
COMMENT ON COLUMN "fund - fund raising record"."information source" IS 'Source of information';
COMMENT ON COLUMN "fund - fund raising record"."do not disclose (fund raising activity)" IS 'Do NOT disclose the fund raising activity only (request by the Fund House or Request by KN)';
COMMENT ON COLUMN "fund - fund raising record"."fund raising record shown in directory" IS 'Fund Raising Record Shown in Directory?';
COMMENT ON COLUMN "fund - fund raising record"."fund raising record exclude from calculation" IS 'Exclude From Calculation?';
COMMENT ON COLUMN "fund - fund raising record"."fund raising record exclude from calculation (by vintage year)" IS 'Exclude From Calculation (by Vintage Year)?';
COMMENT ON COLUMN "fund - fund raising record"."(old 20110629) fund raising record shown in databank" IS 'Shown in Databank?';
COMMENT ON COLUMN "fund - fund raising record"."link_fund raising record shown in databank_id" IS 'Link to whether this fund raising record is to disclose in Databank';
COMMENT ON COLUMN "fund - fund raising record"."fund raising record shown in databank (trial version)" IS 'Trial Version in Databank?';
COMMENT ON COLUMN "fund - fund raising record"."date enteredlastmodified_fund_raise_record" IS 'Date of this record entered';
COMMENT ON COLUMN "fund - fund raising record"."lastmodified_fund_raise_record" IS 'Date of this record last updated';

-- CREATE INDEXES ...
CREATE INDEX "fund - fund raising record_fund id_idx" ON "fund - fund raising record" ("fund id");
CREATE UNIQUE INDEX "fund - fund raising record_fund_raising_record_id_idx" ON "fund - fund raising record" ("fund_raising_record_id");

CREATE TABLE IF NOT EXISTS "fund - fund status update contact info"
 (
	"fund id"			VARCHAR (50) NOT NULL, 
	"contact purpose"			VARCHAR (50), 
	"title"			VARCHAR (20), 
	"first name"			VARCHAR (50), 
	"last name"			VARCHAR (50), 
	"position"			VARCHAR (50), 
	"tel"			VARCHAR (50), 
	"fax"			VARCHAR (50), 
	"email"			VARCHAR (50), 
	"notes"			TEXT, 
	"last contacted"			TIMESTAMP WITHOUT TIME ZONE, 
	"date responsed"			TIMESTAMP WITHOUT TIME ZONE, 
	"date entered_fund_status_update_contact_info"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fund_status_update_contact_info"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fund_status_update_contact_info"			VARCHAR (255)
);
COMMENT ON COLUMN "fund - fund status update contact info"."fund id" IS 'Fund Code must be Unique';
COMMENT ON COLUMN "fund - fund status update contact info"."last contacted" IS 'Date of last contacted';
COMMENT ON COLUMN "fund - fund status update contact info"."date responsed" IS 'Date of response received';
COMMENT ON COLUMN "fund - fund status update contact info"."date entered_fund_status_update_contact_info" IS 'Date of this record entered';

-- CREATE INDEXES ...
CREATE INDEX "fund - fund status update contact info_fund id_idx" ON "fund - fund status update contact info" ("fund id");

CREATE TABLE IF NOT EXISTS "group - institution"
 (
	"group institution id"			SERIAL, 
	"group institution name"			VARCHAR (150), 
	"group ch_institution"			VARCHAR (60), 
	"group joint venture"			BOOLEAN NOT NULL, 
	"link_ii category id"			INTEGER, 
	"link_ii country_id"			INTEGER, 
	"group web site"			VARCHAR (80), 
	"group remarks"			TEXT, 
	"group displayed remarks"			TEXT, 
	"date entered_ii_group"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_ii_group"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ii_group"			VARCHAR (255)
);
COMMENT ON COLUMN "group - institution"."group institution id" IS 'Group Institution ID?';
COMMENT ON COLUMN "group - institution"."group institution name" IS 'Name of Institution in English';
COMMENT ON COLUMN "group - institution"."group ch_institution" IS 'Name of Institution in Chinese';
COMMENT ON COLUMN "group - institution"."group joint venture" IS 'Is the group a Joint Venutre?';
COMMENT ON COLUMN "group - institution"."link_ii category id" IS 'Category of the Group Institution';
COMMENT ON COLUMN "group - institution"."group web site" IS 'Group Web Site?';
COMMENT ON COLUMN "group - institution"."group remarks" IS 'Group Remarks';
COMMENT ON COLUMN "group - institution"."group displayed remarks" IS 'Group Desplayed Remarks';

-- CREATE INDEXES ...
CREATE UNIQUE INDEX "group - institution_id_idx" ON "group - institution" ("group institution id");

CREATE TABLE IF NOT EXISTS "institution"
 (
	"institution id"			SERIAL, 
	"group institution id"			INTEGER, 
	"institution name"			VARCHAR (150), 
	"displayed institution name"			VARCHAR (150), 
	"link investor id (lp name)"			INTEGER, 
	"ch_institution"			VARCHAR (60), 
	"displayed ch_institution"			VARCHAR (60), 
	"shut down (ii)"			BOOLEAN NOT NULL, 
	"ii show in directory"			BOOLEAN NOT NULL, 
	"primary contact?"			VARCHAR (100), 
	"reason for not shown in directory"			VARCHAR (100), 
	"date of verification_company"			TIMESTAMP WITHOUT TIME ZONE, 
	"person handled_company"			VARCHAR (255), 
	"verification status_company"			VARCHAR (255), 
	"remarks_verification_company"			TEXT, 
	"info from kn"			BOOLEAN NOT NULL, 
	"with full contact info"			VARCHAR (100), 
	"address line 1"			VARCHAR (255), 
	"address line 2"			VARCHAR (255), 
	"city"			VARCHAR (40), 
	"state / province"			VARCHAR (30), 
	"zip / postal code"			VARCHAR (15), 
	"link_ii country_id"			INTEGER, 
	"ch_address line 1"			VARCHAR (40), 
	"ch_address line 2"			VARCHAR (40), 
	"ch_city"			VARCHAR (40), 
	"ch_state / province"			VARCHAR (30), 
	"ch_country"			VARCHAR (30), 
	"phone_general"			VARCHAR (25), 
	"fax_general"			VARCHAR (25), 
	"web site"			VARCHAR (200), 
	"e-mail address_firm"			VARCHAR (90), 
	"total asset manage (us$ m)"			REAL, 
	"total asset manage local currency code  (pe and non-pe)"			VARCHAR (3), 
	"total asset manage local amount  (mil) (pe and non-pe)"			REAL, 
	"total asset manage date (pe and non-pe)"			VARCHAR (10), 
	"temp 1 backup of total aset managed"			TIMESTAMP WITHOUT TIME ZONE, 
	"alternative assets under manage  (us$ m)"			REAL, 
	"alternative assets under manage local currency code"			VARCHAR (3), 
	"alternative assets  manage local amount  (mil)"			REAL, 
	"alternative assets  manage date"			VARCHAR (10), 
	"non-asian allocated (us$ m)"			REAL, 
	"non-asian allocated local currency code"			VARCHAR (3), 
	"non-asian allocated local amount (mil)"			REAL, 
	"non-asian allocated date"			VARCHAR (10), 
	"temp 3 backup of intl allocated date"			TIMESTAMP WITHOUT TIME ZONE, 
	"asian allocated (us$ m)"			REAL, 
	"asian allocated local currency code"			VARCHAR (3), 
	"asian allocated local amount (mil)"			REAL, 
	"asian allocated date"			VARCHAR (10), 
	"(old) total pe funds manage currency"			VARCHAR (3), 
	"(old) total pe funds manage amount"			REAL, 
	"(old) total pe funds manage date"			VARCHAR (10), 
	"temp 2 backup of total pe funds manage date"			TIMESTAMP WITHOUT TIME ZONE, 
	"temp 4 backup of asian allocated date"			TIMESTAMP WITHOUT TIME ZONE, 
	"link_ii fund of funds id"			INTEGER, 
	"fund of funds (pe)?"			BOOLEAN NOT NULL, 
	"type-corporate venture?"			BOOLEAN NOT NULL, 
	"link_ii category id"			INTEGER, 
	"company background"			TEXT, 
	"remarks_ii"			TEXT, 
	"displayed remarks_ii"			TEXT, 
	"pe status"			VARCHAR (50), 
	"min investment range currency"			VARCHAR (3), 
	"min investment range amount"			REAL, 
	"max investment range currency"			VARCHAR (3), 
	"max investment range amount"			REAL, 
	"min irr target"			REAL, 
	"max irr target"			REAL, 
	"other selection criteria"			VARCHAR (255), 
	"asian pe funds sponsor"			BOOLEAN NOT NULL, 
	"name of asian pe funds sponsor"			TEXT, 
	"asian pe funds mgt sponsor"			BOOLEAN NOT NULL, 
	"name of asian pe funds mgt sponsor"			VARCHAR (255), 
	"strategic investor"			BOOLEAN NOT NULL, 
	"subsidiary"			INTEGER, 
	"date entered_ii"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_ii"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ii"			VARCHAR (255), 
	"2010 lp dir (rt/hl only)"			VARCHAR (255), 
	"reason for shown in 2010 lp dir (rt/hl only)"			VARCHAR (100), 
	"ii research tier level"			VARCHAR (255), 
	"lp's fund allocation (rt/hl only)"			VARCHAR (255), 
	"last updated_lp's fund allocation"			TIMESTAMP WITHOUT TIME ZONE, 
	"remarks_lp's fund allocation"			TEXT
);
COMMENT ON COLUMN "institution"."institution id" IS 'Institution Code';
COMMENT ON COLUMN "institution"."group institution id" IS 'ID must be the same as Group Institution ID';
COMMENT ON COLUMN "institution"."institution name" IS 'Name of Institution in English';
COMMENT ON COLUMN "institution"."displayed institution name" IS 'Displayed Institution Name';
COMMENT ON COLUMN "institution"."ch_institution" IS 'Name of Institution in Chinese';
COMMENT ON COLUMN "institution"."displayed ch_institution" IS 'Displayed Ch_Institution';
COMMENT ON COLUMN "institution"."shut down (ii)" IS 'II shut down already?';
COMMENT ON COLUMN "institution"."ii show in directory" IS 'II Show in Directory?';
COMMENT ON COLUMN "institution"."primary contact?" IS 'Primary Contact or Secondary Contact?';
COMMENT ON COLUMN "institution"."reason for not shown in directory" IS 'Reason for Not Shown in Directory';
COMMENT ON COLUMN "institution"."date of verification_company" IS 'Date of the II Verification (Company)';
COMMENT ON COLUMN "institution"."person handled_company" IS 'The last person who done the verification (Company)';
COMMENT ON COLUMN "institution"."verification status_company" IS 'The status of verification (Company)';
COMMENT ON COLUMN "institution"."remarks_verification_company" IS 'Remarks_Verification (Company)';
COMMENT ON COLUMN "institution"."info from kn" IS 'Company Information provided by KN';
COMMENT ON COLUMN "institution"."with full contact info" IS 'Whether the II contains full contact information?';
COMMENT ON COLUMN "institution"."address line 1" IS 'Address Line 1 in English';
COMMENT ON COLUMN "institution"."address line 2" IS 'Address Line 2 in English';
COMMENT ON COLUMN "institution"."city" IS 'City';
COMMENT ON COLUMN "institution"."state / province" IS 'State / Province';
COMMENT ON COLUMN "institution"."zip / postal code" IS 'Zip / Postal Code';
COMMENT ON COLUMN "institution"."link_ii country_id" IS 'II Country';
COMMENT ON COLUMN "institution"."ch_address line 1" IS 'Address Line 1 in Chinese';
COMMENT ON COLUMN "institution"."ch_address line 2" IS 'Address Line 2 in Chinese';
COMMENT ON COLUMN "institution"."ch_city" IS 'City in Chinese';
COMMENT ON COLUMN "institution"."ch_state / province" IS 'State / Province in Chinese';
COMMENT ON COLUMN "institution"."ch_country" IS 'Country in Chinese';
COMMENT ON COLUMN "institution"."phone_general" IS 'Phone';
COMMENT ON COLUMN "institution"."fax_general" IS 'Fax';
COMMENT ON COLUMN "institution"."web site" IS 'Web site';
COMMENT ON COLUMN "institution"."e-mail address_firm" IS 'E-mail Address';
COMMENT ON COLUMN "institution"."total asset manage (us$ m)" IS 'Total Asset Pool Under Management (US$ m) (includes both PE and non-PE)';
COMMENT ON COLUMN "institution"."total asset manage local currency code  (pe and non-pe)" IS 'Total Asset Pool Under Management Local Currency Code  (includes both PE and non-PE)';
COMMENT ON COLUMN "institution"."total asset manage local amount  (mil) (pe and non-pe)" IS 'Total Asset Pool Under Management Local Currency Amount (includes both PE and non-PE)';
COMMENT ON COLUMN "institution"."total asset manage date (pe and non-pe)" IS 'Total Asset Pool Under Management Date (includes both PE and non-PE)';
COMMENT ON COLUMN "institution"."alternative assets under manage  (us$ m)" IS 'Alternative Assets Under Manage (US$ m)';
COMMENT ON COLUMN "institution"."alternative assets under manage local currency code" IS 'Asset Pool Under Management Local Currency Code (PE only)';
COMMENT ON COLUMN "institution"."alternative assets  manage local amount  (mil)" IS 'Asset Pool Under Management Local Currency Amount (PE only)';
COMMENT ON COLUMN "institution"."alternative assets  manage date" IS 'Asset Pool Under Management Amount (PE only)';
COMMENT ON COLUMN "institution"."non-asian allocated (us$ m)" IS 'Aggregate Allocated to International PE (US$ m)  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."non-asian allocated local currency code" IS 'Aggregate Allocated to International PE Local Currency Code  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."non-asian allocated local amount (mil)" IS 'Aggregate Allocated to International PE Local Currency Amount  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."non-asian allocated date" IS 'Aggregate Allocated to International PE Date  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."asian allocated (us$ m)" IS 'Aggregate Allocated to Asian PE (US$ m) (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."asian allocated local currency code" IS 'Aggregate Allocated to Asian PE Local Currency Code  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."asian allocated local amount (mil)" IS 'Aggregate Allocated to Asian PE Amount  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."asian allocated date" IS 'Aggregate Allocated to Asian PE Date  (ex Real Estate investments)';
COMMENT ON COLUMN "institution"."(old) total pe funds manage currency" IS 'Asset Pool Under Management Local Currency Code (PE only)';
COMMENT ON COLUMN "institution"."(old) total pe funds manage amount" IS 'Asset Pool Under Management Local Currency Amount (PE only)';
COMMENT ON COLUMN "institution"."(old) total pe funds manage date" IS 'Asset Pool Under Management Amount (PE only)';
COMMENT ON COLUMN "institution"."link_ii fund of funds id" IS 'Fund of Funds Detail';
COMMENT ON COLUMN "institution"."fund of funds (pe)?" IS 'Is it an Privete Equity Fund of Fundsr?';
COMMENT ON COLUMN "institution"."type-corporate venture?" IS 'Is it a Corporate Venturing firm?';
COMMENT ON COLUMN "institution"."link_ii category id" IS 'II Category';
COMMENT ON COLUMN "institution"."company background" IS 'Company Background';
COMMENT ON COLUMN "institution"."remarks_ii" IS 'Remarks of II';
COMMENT ON COLUMN "institution"."displayed remarks_ii" IS 'Remarks of II';
COMMENT ON COLUMN "institution"."pe status" IS 'Current Private Equity Status';
COMMENT ON COLUMN "institution"."min investment range currency" IS 'Min Investment Range Currency';
COMMENT ON COLUMN "institution"."min investment range amount" IS 'Min Investment Range Amount';
COMMENT ON COLUMN "institution"."max investment range currency" IS 'Max Investment Range Currency';
COMMENT ON COLUMN "institution"."max investment range amount" IS 'Max Investment Range Amount';
COMMENT ON COLUMN "institution"."min irr target" IS 'Min IRR Target';
COMMENT ON COLUMN "institution"."max irr target" IS 'Max IRR Target';
COMMENT ON COLUMN "institution"."other selection criteria" IS 'Other Selection Criteria';
COMMENT ON COLUMN "institution"."asian pe funds sponsor" IS 'Asian PE Funds Sponsor?';
COMMENT ON COLUMN "institution"."name of asian pe funds sponsor" IS 'Name of Asian PE Funds Sponsor';
COMMENT ON COLUMN "institution"."asian pe funds mgt sponsor" IS 'Asian PE Funds Management Firm Sponsor?';
COMMENT ON COLUMN "institution"."name of asian pe funds mgt sponsor" IS 'Name of Asian PE Funds Management Firm Sponsor';
COMMENT ON COLUMN "institution"."strategic investor" IS 'Strategic Investor?';
COMMENT ON COLUMN "institution"."subsidiary" IS 'Subsidiary of Which Office?';
COMMENT ON COLUMN "institution"."date entered_ii" IS 'Date of the record entered';
COMMENT ON COLUMN "institution"."lastmodified_ii" IS 'Date of the II last updated';
COMMENT ON COLUMN "institution"."2010 lp dir (rt/hl only)" IS 'The last person who done the verification (for 2010 LP Dir)';
COMMENT ON COLUMN "institution"."reason for shown in 2010 lp dir (rt/hl only)" IS 'Reason for Shown in Directory (for 2010 LP Dir)';
COMMENT ON COLUMN "institution"."ii research tier level" IS 'This is for the priority in doing the research of II.  Raning from 1 to 4, with Tier 1 being the most important.';
COMMENT ON COLUMN "institution"."lp's fund allocation (rt/hl only)" IS 'Have the LP''s fund allocations being checked?';
COMMENT ON COLUMN "institution"."last updated_lp's fund allocation" IS 'Date of the LP''s fund allocation last updated';
COMMENT ON COLUMN "institution"."remarks_lp's fund allocation" IS 'Remarks of LP''s fund allocations';

-- CREATE INDEXES ...
CREATE INDEX "institution_group institution id_idx" ON "institution" ("group institution id");
CREATE UNIQUE INDEX "institution_id_idx" ON "institution" ("institution id");

CREATE TABLE IF NOT EXISTS "institution geog focus"
 (
	"institution id"			INTEGER, 
	"geographic focus"			VARCHAR (50), 
	"date entered_ii_geo_focus"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_ii_geo_focus"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ii_geo_focus"			VARCHAR (255)
);
COMMENT ON COLUMN "institution geog focus"."institution id" IS 'Institution Code must be the same as in Institution Database';
COMMENT ON COLUMN "institution geog focus"."geographic focus" IS 'Geographic Focus';

-- CREATE INDEXES ...
CREATE INDEX "institution geog focus_institution id_idx" ON "institution geog focus" ("institution id");

CREATE TABLE IF NOT EXISTS "institution invest fund"
 (
	"institution_invest_fund_id"			SERIAL, 
	"institution id"			INTEGER, 
	"fund id"			VARCHAR (50), 
	"source of lp's allocation"			VARCHAR (50), 
	"source of date committed"			VARCHAR (50), 
	"date committed (mm/yy)"			VARCHAR (60), 
	"date exit (mm/yy)"			VARCHAR (10), 
	"source of amount committed"			VARCHAR (50), 
	"amount committed"			REAL, 
	"amount committed currency (local currency)"			VARCHAR (5), 
	"amount committed (local currency)"			REAL, 
	"equity stake (percentage)"			DOUBLE PRECISION, 
	"institution action"			VARCHAR (50), 
	"institution_role_in_the_fund (old)"			VARCHAR (50), 
	"allocation to self managed fund"			BOOLEAN NOT NULL, 
	"pe firm's contribution to own fund"			BOOLEAN NOT NULL, 
	"placement agent"			BOOLEAN NOT NULL, 
	"investment_vehicle"			VARCHAR (250), 
	"investment_vehicle_country"			VARCHAR (100), 
	"do not disclose this fund allocation to public?"			VARCHAR (50), 
	"remarks_fund_allocation"			TEXT, 
	"temp 2 backup - date exit"			VARCHAR (50), 
	"temp 1 backup of date committed"			VARCHAR (10), 
	"allocation shown in lp directory"			VARCHAR (100), 
	"invested amount shown in lp directory"			VARCHAR (100), 
	"date entered_ii_invest_fund"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_ii_invest_fund"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ii_invest_fund"			VARCHAR (255)
);
COMMENT ON COLUMN "institution invest fund"."institution_invest_fund_id" IS 'Institution_Invest_Fund_ID';
COMMENT ON COLUMN "institution invest fund"."institution id" IS 'Institution Code must be the same as in Institution Database';
COMMENT ON COLUMN "institution invest fund"."fund id" IS 'Fund Code must be the same as in Fund Database';
COMMENT ON COLUMN "institution invest fund"."source of lp's allocation" IS 'Source of LP''s Allocation';
COMMENT ON COLUMN "institution invest fund"."source of date committed" IS 'Source of Date Committed';
COMMENT ON COLUMN "institution invest fund"."date committed (mm/yy)" IS 'Fund Committment Date (mm/yy)';
COMMENT ON COLUMN "institution invest fund"."date exit (mm/yy)" IS 'Exit Committment Date (mm/yy)';
COMMENT ON COLUMN "institution invest fund"."source of amount committed" IS 'Source of Amount Committed';
COMMENT ON COLUMN "institution invest fund"."amount committed" IS 'Amount Committed (USD)';
COMMENT ON COLUMN "institution invest fund"."amount committed currency (local currency)" IS 'Amount Commited Currency (Local Currency)';
COMMENT ON COLUMN "institution invest fund"."amount committed (local currency)" IS 'Amount Committed (Local Currency)';
COMMENT ON COLUMN "institution invest fund"."equity stake (percentage)" IS 'Equity Stake take (%)';
COMMENT ON COLUMN "institution invest fund"."institution action" IS 'Investment (Fund);Secondary Investment (Fund);Investment (Mgt Company);Secondary Investment (Mgt Company);Divestment (Fund);Divestment (Mgt Company);Legal Advice;Custodian;Investment (Platform);Secondary Investment (Platform);Divestment (Platform)';
COMMENT ON COLUMN "institution invest fund"."institution_role_in_the_fund (old)" IS 'Not used. Financial Investment;Strategic Investment;Placement Agent';
COMMENT ON COLUMN "institution invest fund"."allocation to self managed fund" IS 'Allocation to self managed fund';
COMMENT ON COLUMN "institution invest fund"."pe firm's contribution to own fund" IS 'PE firm''s contribution to own fund';
COMMENT ON COLUMN "institution invest fund"."placement agent" IS 'Placement Agent?';
COMMENT ON COLUMN "institution invest fund"."investment_vehicle" IS 'Investment Vehicle (if applicable)';
COMMENT ON COLUMN "institution invest fund"."investment_vehicle_country" IS 'Investment Vehicle Country (if applicable)';
COMMENT ON COLUMN "institution invest fund"."do not disclose this fund allocation to public?" IS 'Do NOT Disclose fund allocation (Do NOT Disclose (request by LP);Do NOT Disclose (request by KN) (Confidential))';
COMMENT ON COLUMN "institution invest fund"."remarks_fund_allocation" IS 'Remarks';
COMMENT ON COLUMN "institution invest fund"."allocation shown in lp directory" IS 'Allocation Shown in LP Directory?';
COMMENT ON COLUMN "institution invest fund"."invested amount shown in lp directory" IS 'Invested Amount Shown in LP Directory?';
COMMENT ON COLUMN "institution invest fund"."date entered_ii_invest_fund" IS 'Date of this record entered';
COMMENT ON COLUMN "institution invest fund"."lastmodified_ii_invest_fund" IS 'Last update date';

-- CREATE INDEXES ...
CREATE INDEX "institution invest fund_institution id_idx" ON "institution invest fund" ("institution id");
CREATE INDEX "institution invest fund_institution invest fundfund id_idx" ON "institution invest fund" ("fund id");
CREATE UNIQUE INDEX "institution invest fund_institution_invest_fund_id_idx" ON "institution invest fund" ("institution_invest_fund_id");

CREATE TABLE IF NOT EXISTS "link_fund geo focus"
 (
	"fund geo focus id"			SERIAL, 
	"fund geo focus"			VARCHAR (255), 
	"displayed fund geo focus"			VARCHAR (255), 
	"fund geo focus region"			VARCHAR (255), 
	"fund geo focus type"			VARCHAR (255), 
	"group ranking of fund geo focus"			INTEGER, 
	"fund geo focus based in asia"			BOOLEAN NOT NULL, 
	"include in calculation of ii allocation (fund geo focus)"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus" IS 'Fund Geo Focus';
COMMENT ON COLUMN "link_fund geo focus"."displayed fund geo focus" IS 'Displayed Fund Geo Focus';
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus region" IS 'Fund Geo Focus Region?';
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus type" IS 'Fund Geo Focus Type?';
COMMENT ON COLUMN "link_fund geo focus"."group ranking of fund geo focus" IS 'Group Ranking of Fund Geo Focus';
COMMENT ON COLUMN "link_fund geo focus"."fund geo focus based in asia" IS 'Asia/Non-Asia?';
COMMENT ON COLUMN "link_fund geo focus"."include in calculation of ii allocation (fund geo focus)" IS 'For calculation of II allocation. Only include Asia Focus Fund.  Exclude both "Global (include Asia)" and "Global (exclude Asia)".';

-- CREATE INDEXES ...
ALTER TABLE "link_fund geo focus" ADD CONSTRAINT "link_fund geo focus_pkey" PRIMARY KEY ("fund geo focus id");

CREATE TABLE IF NOT EXISTS "link_fund industries focus"
 (
	"fund industries focus id"			SERIAL, 
	"displayed group of fund industries focus"			VARCHAR (255), 
	"displayed fund industries focus"			VARCHAR (255), 
	"ranking of fund industries focus"			INTEGER, 
	"group of fund industries focus"			VARCHAR (255), 
	"fund industries focus"			VARCHAR (255)
);
COMMENT ON COLUMN "link_fund industries focus"."displayed group of fund industries focus" IS 'Displayed Group of Fund Industries Focus';
COMMENT ON COLUMN "link_fund industries focus"."displayed fund industries focus" IS 'Displayed Fund Industries Focus';
COMMENT ON COLUMN "link_fund industries focus"."ranking of fund industries focus" IS 'Ranking of Fund Industries Focus';
COMMENT ON COLUMN "link_fund industries focus"."group of fund industries focus" IS 'Group of Fund Industries Focus';
COMMENT ON COLUMN "link_fund industries focus"."fund industries focus" IS 'Fund Industries Focus';

-- CREATE INDEXES ...
ALTER TABLE "link_fund industries focus" ADD CONSTRAINT "link_fund industries focus_pkey" PRIMARY KEY ("fund industries focus id");

CREATE TABLE IF NOT EXISTS "link_fund level lp"
 (
	"fund level lp category id"			SERIAL, 
	"fund level lp category"			VARCHAR (255), 
	"displayed fund level lp category"			VARCHAR (255), 
	"ranking of fund level lp category"			INTEGER
);
COMMENT ON COLUMN "link_fund level lp"."fund level lp category" IS 'II_Category';
COMMENT ON COLUMN "link_fund level lp"."displayed fund level lp category" IS 'Displayed II Category';
COMMENT ON COLUMN "link_fund level lp"."ranking of fund level lp category" IS 'Ranking of II Category';

-- CREATE INDEXES ...
ALTER TABLE "link_fund level lp" ADD CONSTRAINT "link_fund level lp_pkey" PRIMARY KEY ("fund level lp category id");

CREATE TABLE IF NOT EXISTS "link_fund local currency fund"
 (
	"local currency fund id"			SERIAL, 
	"displayed local currency fund"			VARCHAR (255), 
	"local currency fund"			VARCHAR (255), 
	"yuan dominated fund?"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "link_fund local currency fund"."displayed local currency fund" IS 'Displayed value';
COMMENT ON COLUMN "link_fund local currency fund"."local currency fund" IS 'What is the local currency of the fund?';
COMMENT ON COLUMN "link_fund local currency fund"."yuan dominated fund?" IS 'Yuan Dominated Fund?';

-- CREATE INDEXES ...
ALTER TABLE "link_fund local currency fund" ADD CONSTRAINT "link_fund local currency fund_pkey" PRIMARY KEY ("local currency fund id");

CREATE TABLE IF NOT EXISTS "link_fund management level category"
 (
	"fund management level category id"			SERIAL, 
	"fund management level category"			VARCHAR (255), 
	"displayed fund management level category"			VARCHAR (255), 
	"ranking of fund management level category"			INTEGER
);
COMMENT ON COLUMN "link_fund management level category"."fund management level category" IS 'II_Category';
COMMENT ON COLUMN "link_fund management level category"."displayed fund management level category" IS 'Displayed II Category';
COMMENT ON COLUMN "link_fund management level category"."ranking of fund management level category" IS 'Ranking of II Category';

-- CREATE INDEXES ...
ALTER TABLE "link_fund management level category" ADD CONSTRAINT "link_fund management level category_pkey" PRIMARY KEY ("fund management level category id");

CREATE TABLE IF NOT EXISTS "link_fund management level country"
 (
	"fund management level country id"			SERIAL, 
	"fund management level country"			VARCHAR (255), 
	"fund management level region"			VARCHAR (255), 
	"fund management level country based in asia"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_fund management level country" ADD CONSTRAINT "link_fund management level country_pkey" PRIMARY KEY ("fund management level country id");

CREATE TABLE IF NOT EXISTS "link_fund raising record shown in databank"
 (
	"id_fund raising record shown in databank"			SERIAL, 
	"fund raising record shown in databank (in msaccess)"			VARCHAR (255), 
	"fund raising record shown in databank"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_fund raising record shown in databank" ADD CONSTRAINT "link_fund raising record shown in databank_pkey" PRIMARY KEY ("id_fund raising record shown in databank");

CREATE TABLE IF NOT EXISTS "link_fund size range"
 (
	"fund size range id"			SERIAL, 
	"fund size range"			VARCHAR (255)
);
COMMENT ON COLUMN "link_fund size range"."fund size range" IS 'Fund Size Range';

-- CREATE INDEXES ...
ALTER TABLE "link_fund size range" ADD CONSTRAINT "link_fund size range_pkey" PRIMARY KEY ("fund size range id");

CREATE TABLE IF NOT EXISTS "link_fund sri focus"
 (
	"fund sri focus id"			SERIAL, 
	"displayed sri focus"			VARCHAR (255), 
	"sri focus"			VARCHAR (255), 
	"ranking of sri focus"			INTEGER
);
COMMENT ON COLUMN "link_fund sri focus"."displayed sri focus" IS 'Displayed SRI Focus';
COMMENT ON COLUMN "link_fund sri focus"."sri focus" IS 'SRI Focus';
COMMENT ON COLUMN "link_fund sri focus"."ranking of sri focus" IS 'Ranking of SRI Focus';

-- CREATE INDEXES ...
ALTER TABLE "link_fund sri focus" ADD CONSTRAINT "link_fund sri focus_pkey" PRIMARY KEY ("fund sri focus id");

CREATE TABLE IF NOT EXISTS "link_ii category"
 (
	"ii category id"			SERIAL, 
	"ii category"			VARCHAR (255), 
	"displayed ii category"			VARCHAR (255), 
	"ranking of ii category"			INTEGER
);
COMMENT ON COLUMN "link_ii category"."ii category" IS 'II_Category';
COMMENT ON COLUMN "link_ii category"."displayed ii category" IS 'Displayed II Category';
COMMENT ON COLUMN "link_ii category"."ranking of ii category" IS 'Ranking of II Category';

-- CREATE INDEXES ...
ALTER TABLE "link_ii category" ADD CONSTRAINT "link_ii category_pkey" PRIMARY KEY ("ii category id");

CREATE TABLE IF NOT EXISTS "link_ii country"
 (
	"ii country id"			SERIAL, 
	"ii country"			VARCHAR (255), 
	"ii region"			VARCHAR (255), 
	"ii country based in asia"			BOOLEAN NOT NULL
);

-- CREATE INDEXES ...
ALTER TABLE "link_ii country" ADD CONSTRAINT "link_ii country_pkey" PRIMARY KEY ("ii country id");

CREATE TABLE IF NOT EXISTS "link_ii fund of funds"
 (
	"fund of funds id"			SERIAL, 
	"fofs category"			VARCHAR (255), 
	"displayed fofs category"			VARCHAR (255), 
	"fund of funds"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "link_ii fund of funds"."fofs category" IS 'FOFs Category (internal-use value)';
COMMENT ON COLUMN "link_ii fund of funds"."displayed fofs category" IS 'FOFs Category (Displayed value)';
COMMENT ON COLUMN "link_ii fund of funds"."fund of funds" IS 'Fund of Funds?';

-- CREATE INDEXES ...
ALTER TABLE "link_ii fund of funds" ADD CONSTRAINT "link_ii fund of funds_pkey" PRIMARY KEY ("fund of funds id");

CREATE TABLE IF NOT EXISTS "listed fund info"
 (
	"fund id"			VARCHAR (50), 
	"listed fund or not"			BOOLEAN NOT NULL, 
	"listed date (yyyymm)"			VARCHAR (10), 
	"listed stock exchange"			VARCHAR (50), 
	"listed country"			VARCHAR (50), 
	"stock code"			VARCHAR (50), 
	"remarks"			VARCHAR (255), 
	"date entered_listed_fund_info"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_listed_fund_info"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_listed_fund_info"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "listed fund info_fund id_idx" ON "listed fund info" ("fund id");
CREATE INDEX "listed fund info_stock code_idx" ON "listed fund info" ("stock code");

CREATE TABLE IF NOT EXISTS "listed institutional investor info"
 (
	"institution id"			INTEGER, 
	"listed company or not"			BOOLEAN NOT NULL, 
	"listed date (yyyymm)"			VARCHAR (10), 
	"listed stock exchange"			VARCHAR (50), 
	"listed country"			VARCHAR (50), 
	"stock code"			VARCHAR (50), 
	"remarks"			VARCHAR (255), 
	"date entered"			TIMESTAMP WITHOUT TIME ZONE
);

-- CREATE INDEXES ...
CREATE INDEX "listed institutional investor info_fund id_idx" ON "listed institutional investor info" ("institution id");
CREATE INDEX "listed institutional investor info_stock code_idx" ON "listed institutional investor info" ("stock code");

CREATE TABLE IF NOT EXISTS "listed pe firm info"
 (
	"fund id"			VARCHAR (50), 
	"listed company or not"			BOOLEAN NOT NULL, 
	"listed date (yyyymm)"			VARCHAR (10), 
	"listed stock exchange"			VARCHAR (50), 
	"listed country"			VARCHAR (50), 
	"stock code"			VARCHAR (50), 
	"remarks"			VARCHAR (255), 
	"date entered_listed_pe_firm_info"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_listed_pe_firm_info"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_listed_pe_firm_info"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "listed pe firm info_fund id_idx" ON "listed pe firm info" ("fund id");
CREATE INDEX "listed pe firm info_stock code_idx" ON "listed pe firm info" ("stock code");

CREATE TABLE IF NOT EXISTS "paste errors"
 (
	"field0"			VARCHAR (255)
);

-- CREATE INDEXES ...

CREATE TABLE IF NOT EXISTS "preferred investment"
 (
	"institution id"			INTEGER NOT NULL, 
	"preferred investment"			VARCHAR (55), 
	"date entered_preferred_invest"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_preferred_invest"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_ii_preferred_invest"			VARCHAR (255)
);
COMMENT ON COLUMN "preferred investment"."institution id" IS 'Institution Code must be the same as in Institution Database';
COMMENT ON COLUMN "preferred investment"."preferred investment" IS 'Preferred Investment';

-- CREATE INDEXES ...
CREATE INDEX "preferred investment_institution id1_idx" ON "preferred investment" ("institution id");

CREATE TABLE IF NOT EXISTS "rejected mail record"
 (
	"contact id"			INTEGER, 
	"rejected id"			INTEGER, 
	"date rejected"			TIMESTAMP WITHOUT TIME ZONE
);

-- CREATE INDEXES ...
CREATE INDEX "rejected mail record_contact id_idx" ON "rejected mail record" ("rejected id");
CREATE INDEX "rejected mail record_fund id_idx" ON "rejected mail record" ("contact id");

CREATE TABLE IF NOT EXISTS "fund - fundmgr_of_fund"
 (
	"id_fundmgr_of_fund"			SERIAL, 
	"link_fund id"			VARCHAR (255) NOT NULL, 
	"link investor id (fundmgr name)"			INTEGER, 
	"fundmgr name quote from original source"			TEXT, 
	"link_source id (fund - fundmgr name source)"			INTEGER, 
	"remarks_fundmgr_of_fund"			TEXT, 
	"date entered_fundmgr_of_fund"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_fundmgr_of_fund"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_fundmgr_of_fund"			VARCHAR (255)
);
COMMENT ON COLUMN "fund - fundmgr_of_fund"."link_fund id" IS 'Name of the fund being managed';

-- CREATE INDEXES ...
CREATE INDEX "fund - fundmgr_of_fund_link_investment round id_idx" ON "fund - fundmgr_of_fund" ("link_fund id");
ALTER TABLE "fund - fundmgr_of_fund" ADD CONSTRAINT "fund - fundmgr_of_fund_pkey" PRIMARY KEY ("id_fundmgr_of_fund");

CREATE TABLE IF NOT EXISTS "link_fund category"
 (
	"fund category id"			SERIAL, 
	"fund category"			VARCHAR (255), 
	"displayed fund category"			VARCHAR (255), 
	"ranking of fund category"			INTEGER, 
	"include in dir"			BOOLEAN NOT NULL, 
	"include in calculation of ii allocation (fund category)"			BOOLEAN NOT NULL
);
COMMENT ON COLUMN "link_fund category"."fund category" IS 'Fund Category';
COMMENT ON COLUMN "link_fund category"."displayed fund category" IS 'Displayed Fund Category';
COMMENT ON COLUMN "link_fund category"."ranking of fund category" IS 'Ranking of Fund Category';
COMMENT ON COLUMN "link_fund category"."include in dir" IS 'Include in Dir?';
COMMENT ON COLUMN "link_fund category"."include in calculation of ii allocation (fund category)" IS 'For calculation of II allocation.  Include allocation to FOFs.';

-- CREATE INDEXES ...
ALTER TABLE "link_fund category" ADD CONSTRAINT "link_fund category_pkey" PRIMARY KEY ("fund category id");

CREATE TABLE IF NOT EXISTS "link_fund nature of firm"
 (
	"fund nature of firm id"			SERIAL, 
	"displayed nature of firm"			VARCHAR (255), 
	"nature of firm"			VARCHAR (255), 
	"ranking of the nature"			INTEGER
);
COMMENT ON COLUMN "link_fund nature of firm"."displayed nature of firm" IS 'Displayed Nature of Firm';
COMMENT ON COLUMN "link_fund nature of firm"."nature of firm" IS 'Nature of Firm';
COMMENT ON COLUMN "link_fund nature of firm"."ranking of the nature" IS 'Ranking of PE Firm Nature';

-- CREATE INDEXES ...
ALTER TABLE "link_fund nature of firm" ADD CONSTRAINT "link_fund nature of firm_pkey" PRIMARY KEY ("fund nature of firm id");


-- CREATE Relationships ...
-- Relationship from "Rejected Mail Record" ("contact id") to "Contact"("contact id") does not enforce integrity.
-- Relationship from "Fund" ("fund id") to "Fund - Fund Management Structure"("fund id") does not enforce integrity.
-- Relationship from "Fund - APER (Monthly) Reported" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Fund - APER edition" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Fund - Capital Available Record" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Fund - Expected date of Fund raising" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Fund - Fund LP Summary" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Fund - Fund Raising Record" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Fund - Fund Status Update Contact Info" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Institution Invest Fund" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Listed PE Firm info" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Listed Fund info" ("fund id") to "Fund"("fund id") does not enforce integrity.
-- Relationship from "Institution" ("group institution id") to "Group - Institution"("group institution id") does not enforce integrity.
-- Relationship from "Contact" ("institution id") to "Institution"("institution id") does not enforce integrity.
-- Relationship from "Factiva_Data" ("institution id") to "Institution"("institution id") does not enforce integrity.
-- Relationship from "Institution Geog Focus" ("institution id") to "Institution"("institution id") does not enforce integrity.
-- Relationship from "Institution Invest Fund" ("institution id") to "Institution"("institution id") does not enforce integrity.
-- Relationship from "Listed Institutional Investor info" ("institution id") to "Institution"("institution id") does not enforce integrity.
-- Relationship from "Preferred Investment" ("institution id") to "Institution"("institution id") does not enforce integrity.
-- Relationship from "Fund" ("link_fund category_id") to "Link_Fund Category"("fund category id") does not enforce integrity.
-- Relationship from "Fund" ("link_fund geo focus_id") to "Link_Fund Geo Focus"("fund geo focus id") does not enforce integrity.
-- Relationship from "Fund" ("link_fund industries focus_id") to "Link_Fund Industries Focus"("fund industries focus id") does not enforce integrity.
-- Relationship from "Fund - Fund LP Summary" ("link_fund lp level id category id") to "Link_Fund Level LP"("fund level lp category id") does not enforce integrity.
-- Relationship from "Fund" ("link_local currency fund_id") to "Link_Fund Local Currency Fund"("local currency fund id") does not enforce integrity.
-- Relationship from "Fund - Fund Management Structure" ("link_fund management level category id") to "Link_Fund Management Level Category"("fund management level category id") does not enforce integrity.
-- Relationship from "Fund - Fund Management Structure" ("link_fund management level country id") to "Link_Fund Management Level Country"("fund management level country id") does not enforce integrity.
-- Relationship from "Fund" ("link_fund nature of firm_id") to "Link_Fund Nature of Firm"("fund nature of firm id") does not enforce integrity.
-- Relationship from "Institution" ("link_ii fund of funds id") to "Link_II Fund of Funds"("fund of funds id") does not enforce integrity.
-- Relationship from "Fund - Fund Raising Record" ("link_fund raising record shown in databank_id") to "Link_Fund Raising Record Shown in Databank"("id_fund raising record shown in databank") does not enforce integrity.
-- Relationship from "Fund" ("link_fund size range_id") to "Link_Fund Size Range"("fund size range id") does not enforce integrity.
-- Relationship from "Fund" ("link_fund sri focus_id") to "Link_Fund SRI Focus"("fund sri focus id") does not enforce integrity.
-- Relationship from "Group - Institution" ("link_ii category id") to "Link_II Category"("ii category id") does not enforce integrity.
-- Relationship from "Institution" ("link_ii category id") to "Link_II Category"("ii category id") does not enforce integrity.
-- Relationship from "Fund - Fund LP Summary" ("country") to "Link_II Country"("ii country id") does not enforce integrity.
-- Relationship from "Group - Institution" ("link_ii country_id") to "Link_II Country"("ii country id") does not enforce integrity.
-- Relationship from "Institution" ("link_ii country_id") to "Link_II Country"("ii country id") does not enforce integrity.
-- ----------------------------------------------------------
-- MDB Tools - A library for reading MS Access database files
-- Copyright (C) 2000-2011 Brian Bruns and others.
-- Files in libmdb are licensed under LGPL and the utilities under
-- the GPL, see COPYING.LIB and COPYING files respectively.
-- Check out http://mdbtools.sourceforge.net
-- ----------------------------------------------------------

SET client_encoding = 'UTF-8';

CREATE TABLE IF NOT EXISTS "docu category for docu"
 (
	"id_docucat for docu"			SERIAL, 
	"link_doculibrary id"			INTEGER, 
	"link_docucategory id"			INTEGER, 
	"date entered (docucat record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"date modified (docucat record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_docucatrecord"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "docu category for docu_link_docucategory id_idx" ON "docu category for docu" ("link_docucategory id");
CREATE INDEX "docu category for docu_link_doculibrary id_idx" ON "docu category for docu" ("link_doculibrary id");
ALTER TABLE "docu category for docu" ADD CONSTRAINT "docu category for docu_pkey" PRIMARY KEY ("id_docucat for docu");

CREATE TABLE IF NOT EXISTS "doculibrary"
 (
	"id_docu"			SERIAL, 
	"date_docu"			TIMESTAMP WITHOUT TIME ZONE, 
	"hyperlink_docu"			TEXT, 
	"file_name_1"			VARCHAR (255), 
	"description_docu"			TEXT, 
	"remarks_docu"			TEXT, 
	"link investor id (source_name_1)"			INTEGER, 
	"date entered_docu"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_docu"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_docu"			VARCHAR (255), 
	"xx link investee id (source_name_2)"			INTEGER
);

-- CREATE INDEXES ...
ALTER TABLE "doculibrary" ADD CONSTRAINT "doculibrary_pkey" PRIMARY KEY ("id_docu");

CREATE TABLE IF NOT EXISTS "firm in docu"
 (
	"id_firm in docu"			SERIAL, 
	"link_doculibrary id"			INTEGER, 
	"link investor id (firm in docu)"			INTEGER, 
	"date entered (firm in docu record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"date modified (firm in docu record)"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_firm in docurecord"			VARCHAR (255)
);

-- CREATE INDEXES ...
CREATE INDEX "firm in docu_link_docucategory id_idx" ON "firm in docu" ("link investor id (firm in docu)");
CREATE INDEX "firm in docu_link_doculibrary id_idx" ON "firm in docu" ("link_doculibrary id");
ALTER TABLE "firm in docu" ADD CONSTRAINT "firm in docu_pkey" PRIMARY KEY ("id_firm in docu");

CREATE TABLE IF NOT EXISTS "supportdoculink"
 (
	"id_support_docu"			SERIAL, 
	"link to doculibrary id"			INTEGER, 
	"page num doculibrary record"			VARCHAR (255), 
	"remarks_support_docu"			TEXT, 
	"obsolete"			BOOLEAN NOT NULL, 
	"link to investor id (firm)"			INTEGER, 
	"link to investee id"			INTEGER, 
	"link to investrd id"			INTEGER, 
	"link to fund id"			VARCHAR (50), 
	"link to fundrd id"			INTEGER, 
	"link to divest id"			INTEGER, 
	"link to valuation id"			INTEGER, 
	"date entered_support_docu"			TIMESTAMP WITHOUT TIME ZONE, 
	"lastmodified_support_docu"			TIMESTAMP WITHOUT TIME ZONE, 
	"updatedby_support_doc"			VARCHAR (255)
);
COMMENT ON COLUMN "supportdoculink"."link to investee id" IS 'Do not use this field.  Update Firm (Investor ID) directly';

-- CREATE INDEXES ...
CREATE INDEX "supportdoculink_link to fund id_idx" ON "supportdoculink" ("link to fund id");
CREATE INDEX "supportdoculink_link to fundrd id_idx" ON "supportdoculink" ("link to fundrd id");
CREATE INDEX "supportdoculink_link to fundrd id1_idx" ON "supportdoculink" ("link to divest id");
CREATE INDEX "supportdoculink_link to investee id_idx" ON "supportdoculink" ("link to investee id");
CREATE INDEX "supportdoculink_link to investrd id_idx" ON "supportdoculink" ("link to investrd id");
CREATE INDEX "supportdoculink_link to investrd id1_idx" ON "supportdoculink" ("link to valuation id");
CREATE INDEX "supportdoculink_link to investrd id2_idx" ON "supportdoculink" ("link to investor id (firm)");
CREATE INDEX "supportdoculink_link to library record id_idx" ON "supportdoculink" ("link to doculibrary id");
ALTER TABLE "supportdoculink" ADD CONSTRAINT "supportdoculink_pkey" PRIMARY KEY ("id_support_docu");

CREATE TABLE IF NOT EXISTS "link_docucategory"
 (
	"id_docucategory"			SERIAL, 
	"docu_category"			VARCHAR (255), 
	"ranking of docu category in msaccess"			INTEGER, 
	"displayed docu category in msaccess"			VARCHAR (255)
);

-- CREATE INDEXES ...
ALTER TABLE "link_docucategory" ADD CONSTRAINT "link_docucategory_pkey" PRIMARY KEY ("id_docucategory");


-- CREATE Relationships ...
-- Relationship from "Docu Category for Docu" ("link_doculibrary id") to "Doculibrary"("id_docu") does not enforce integrity.
-- Relationship from "Firm in Docu" ("link_doculibrary id") to "Doculibrary"("id_docu") does not enforce integrity.
-- Relationship from "Docu Category for Docu" ("link_docucategory id") to "Link_Docucategory"("id_docucategory") does not enforce integrity.
ALTER TABLE "MSysNavPaneGroups" ADD CONSTRAINT "msysnavpanegroups_groupcategoryid_fk" FOREIGN KEY ("groupcategoryid") REFERENCES "MSysNavPaneGroupCategories"("id") ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE;
