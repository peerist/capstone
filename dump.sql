--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Debian 12.1-1.pgdg100+1)
-- Dumped by pg_dump version 12.1 (Debian 12.1-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: event_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_log (id, schema_name, table_name, trigger_name, payload, delivered, error, tries, created_at, locked, next_retry_at, archived) FROM stdin;
\.


--
-- Data for Name: event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_table; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_table (table_schema, table_name, configuration, is_system_defined, is_enum) FROM stdin;
hdb_catalog	hdb_table	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	tables	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	schemata	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	views	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_primary_key	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
information_schema	columns	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_foreign_key_constraint	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_relationship	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_permission_agg	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_check_constraint	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_unique_constraint	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	event_triggers	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	event_log	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	event_invocation_logs	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_function_agg	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_function	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	remote_schemas	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_version	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_query_collection	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
hdb_catalog	hdb_allowlist	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	t	f
public	Users	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Segment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	SegmentVersion	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Paper	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	PaperVersion	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	PaperSegment	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	SegmentFeedback	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	Circles	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
public	CircleMembers	{"custom_root_fields": {"delete": null, "insert": null, "select": null, "update": null, "select_by_pk": null, "select_aggregate": null}, "custom_column_names": {}}	f	f
\.


--
-- Data for Name: event_triggers; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.event_triggers (name, type, schema_name, table_name, configuration, comment) FROM stdin;
\.


--
-- Data for Name: hdb_query_collection; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_query_collection (collection_name, collection_defn, comment, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_allowlist; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_allowlist (collection_name) FROM stdin;
\.


--
-- Data for Name: hdb_computed_field; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_computed_field (table_schema, table_name, computed_field_name, definition, comment) FROM stdin;
\.


--
-- Data for Name: hdb_function; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_function (function_schema, function_name, configuration, is_system_defined) FROM stdin;
\.


--
-- Data for Name: hdb_permission; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_permission (table_schema, table_name, role_name, perm_type, perm_def, comment, is_system_defined) FROM stdin;
public	Users	user	insert	{"set": {}, "check": {}, "columns": ["Id", "email"]}	\N	f
public	Users	user	select	{"filter": {}, "columns": ["Id", "email"], "computed_fields": [], "allow_aggregations": false}	\N	f
\.


--
-- Data for Name: hdb_relationship; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_relationship (table_schema, table_name, rel_name, rel_type, rel_def, comment, is_system_defined) FROM stdin;
hdb_catalog	hdb_table	detail	object	{"manual_configuration": {"remote_table": {"name": "tables", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	primary_key	object	{"manual_configuration": {"remote_table": {"name": "hdb_primary_key", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	columns	array	{"manual_configuration": {"remote_table": {"name": "columns", "schema": "information_schema"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	foreign_key_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_foreign_key_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	relationships	array	{"manual_configuration": {"remote_table": {"name": "hdb_relationship", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	permissions	array	{"manual_configuration": {"remote_table": {"name": "hdb_permission_agg", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	check_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_check_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	hdb_table	unique_constraints	array	{"manual_configuration": {"remote_table": {"name": "hdb_unique_constraint", "schema": "hdb_catalog"}, "column_mapping": {"table_name": "table_name", "table_schema": "table_schema"}}}	\N	t
hdb_catalog	event_log	trigger	object	{"manual_configuration": {"remote_table": {"name": "event_triggers", "schema": "hdb_catalog"}, "column_mapping": {"trigger_name": "name"}}}	\N	t
hdb_catalog	event_triggers	events	array	{"manual_configuration": {"remote_table": {"name": "event_log", "schema": "hdb_catalog"}, "column_mapping": {"name": "trigger_name"}}}	\N	t
hdb_catalog	event_invocation_logs	event	object	{"foreign_key_constraint_on": "event_id"}	\N	t
hdb_catalog	event_log	logs	array	{"foreign_key_constraint_on": {"table": {"name": "event_invocation_logs", "schema": "hdb_catalog"}, "column": "event_id"}}	\N	t
hdb_catalog	hdb_function_agg	return_table_info	object	{"manual_configuration": {"remote_table": {"name": "hdb_table", "schema": "hdb_catalog"}, "column_mapping": {"return_type_name": "table_name", "return_type_schema": "table_schema"}}}	\N	t
public	Segment	history	array	{"foreign_key_constraint_on": {"table": "SegmentVersion", "column": "segmentId"}}	\N	f
public	PaperVersion	Paper	object	{"foreign_key_constraint_on": "paperId"}	\N	f
public	Paper	history	array	{"foreign_key_constraint_on": {"table": "PaperVersion", "column": "paperId"}}	\N	f
public	PaperSegment	Paper	object	{"foreign_key_constraint_on": "paperId"}	\N	f
public	Paper	segments	array	{"foreign_key_constraint_on": {"table": "PaperSegment", "column": "paperId"}}	\N	f
public	PaperSegment	PaperVersion	object	{"foreign_key_constraint_on": "paperVersionId"}	\N	f
public	PaperVersion	segments	array	{"foreign_key_constraint_on": {"table": "PaperSegment", "column": "paperVersionId"}}	\N	f
public	PaperSegment	Segment	object	{"foreign_key_constraint_on": "segmentId"}	\N	f
public	Paper	User	object	{"foreign_key_constraint_on": "userId"}	\N	f
public	Users	papers	array	{"foreign_key_constraint_on": {"table": "Paper", "column": "userId"}}	\N	f
public	Segment	User	object	{"foreign_key_constraint_on": "userId"}	\N	f
public	Users	segments	array	{"foreign_key_constraint_on": {"table": "Segment", "column": "userId"}}	\N	f
public	Circles	Admin	object	{"foreign_key_constraint_on": "AdminUserId"}	\N	f
public	CircleMembers	MemberUser	object	{"foreign_key_constraint_on": "MemberUserId"}	\N	f
public	CircleMembers	Circle	object	{"foreign_key_constraint_on": "CircleId"}	\N	f
public	Users	adminCircles	array	{"foreign_key_constraint_on": {"table": "Circles", "column": "AdminUserId"}}	\N	f
public	Users	circleMemberships	array	{"foreign_key_constraint_on": {"table": "CircleMembers", "column": "MemberUserId"}}	\N	f
public	SegmentFeedback	SegmentVersion	object	{"foreign_key_constraint_on": "segmentVersionID"}	\N	f
public	SegmentVersion	SegmentID	object	{"foreign_key_constraint_on": "segmentId"}	\N	f
public	SegmentVersion	SegmentFeedbacks	array	{"foreign_key_constraint_on": {"table": "SegmentFeedback", "column": "segmentVersionID"}}	\N	f
\.


--
-- Data for Name: hdb_schema_update_event; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_schema_update_event (instance_id, occurred_at) FROM stdin;
f3ba44d7-b3d0-437c-a561-b249b8ee3211	2020-02-14 20:37:30.630589+00
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state) FROM stdin;
b402bcc0-bc0e-4f10-b2f1-eec1ca950f8c	28	2020-02-14 20:18:29.626468+00	{}	{"telemetryNotificationShown": true}
\.


--
-- Data for Name: migration_settings; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.migration_settings (setting, value) FROM stdin;
migration_mode	true
\.


--
-- Data for Name: remote_schemas; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.remote_schemas (id, name, definition, comment) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: hdb_catalog; Owner: postgres
--

COPY hdb_catalog.schema_migrations (version, dirty) FROM stdin;
1580594953348	f
1580595537643	f
1580595590603	f
1580595661599	f
1580595970706	f
1580596018361	f
1580596209720	f
1580596231797	f
1580596244400	f
1580596589071	f
1580596618594	f
1580596743034	f
1580596755575	f
1580596798357	f
1580596820278	f
1580597278350	f
1580597330270	f
1580597467274	f
1580597491254	f
1580597531358	f
1580597567028	f
1580597582770	f
1580597638268	f
1580597654426	f
1580597664756	f
1580597698238	f
1580597724638	f
1580597734896	f
1580597755734	f
1580597824055	f
1580597851488	f
1580597867407	f
1580597898259	f
1580597933563	f
1580598017883	f
1580598032404	f
1580598056819	f
1580598249764	f
1580598259759	f
1580598267041	f
1580598273809	f
1580598434114	f
1580598516426	f
1580598539856	f
1580598570340	f
1580598580426	f
1580623060187	f
1580623067781	f
1580623076430	f
1580623872040	f
1580624318398	f
1580624329350	f
1580624481089	f
1580624495103	f
1580624937634	f
1580624964681	f
1580624973237	f
1580625010323	f
1580625021880	f
1580700986598	f
1580700996219	f
1580701231624	f
1580701234690	f
1580701266801	f
1580701272936	f
1580701283018	f
1581550735230	f
1581640073545	f
1581640154519	f
1581640319620	f
1581640355852	f
1581640382328	f
1581640413856	f
1581640716217	f
1581640787223	f
1581640943283	f
1581641001483	f
1581641054773	f
1581641142362	f
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("Id", email) FROM stdin;
1	manzoj@oregonstate.edu
2	hoskinc@oregonstate.edu
3	mosleyd@oregonstate.edu
4	chanmic@oregonstate.edu
\.


--
-- Data for Name: Circles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Circles" ("Id", "AdminUserId") FROM stdin;
1	1
2	4
\.


--
-- Data for Name: CircleMembers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CircleMembers" ("MemberUserId", "CircleId") FROM stdin;
2	1
3	1
4	1
2	2
3	2
4	2
1	1
\.


--
-- Data for Name: Paper; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Paper" ("Id", name, "currentVersion", "userId") FROM stdin;
1	Test Paper	\N	1
\.


--
-- Data for Name: PaperVersion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PaperVersion" ("Id", version, "paperId") FROM stdin;
\.


--
-- Data for Name: Segment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Segment" (id, name, content, "currentVersion", "userId", status) FROM stdin;
1	Test segment 	The quick brown fox jumps over the lazy dog	1	1	0
2	Test segment 	Hello world	1	2	0
3	Test segment 	asdfghjkl;	1	3	0
4	Test segment 	window.alert('hello world')	1	4	0
\.


--
-- Data for Name: PaperSegment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PaperSegment" ("Id", "atVersion", "order", "paperId", "paperVersionId", "segmentId") FROM stdin;
1	1	1	1	\N	1
2	1	2	1	\N	2
3	1	3	1	\N	3
4	1	4	1	\N	4
\.


--
-- Data for Name: SegmentVersion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SegmentVersion" (id, content, "segmentId", version) FROM stdin;
1	The quick brown fox jumps over the lazy dog	1	1
2	Hello world	2	1
3	Hello World!	2	1
4	asdfghjkl;	3	1
\.


--
-- Data for Name: SegmentFeedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SegmentFeedback" ("Id", "segmentVersionID", "sentenceFeedback", "userId") FROM stdin;
1	1	Im leaving feedback on my own segment wow	1
2	1	nice work!	2
3	1	This is awful	3
4	1	Classic!	3
5	2	I believe it should be: printf("Hello World!\\0");	1
7	2	Hello World!	3
6	2	Hello World!	2
8	3	Perfect!	1
9	3	Great!	2
10	3	Awesome!	3
11	3	Excellent!	4
\.


--
-- Name: remote_schemas_id_seq; Type: SEQUENCE SET; Schema: hdb_catalog; Owner: postgres
--

SELECT pg_catalog.setval('hdb_catalog.remote_schemas_id_seq', 1, false);


--
-- Name: Circles_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Circles_Id_seq"', 2, true);


--
-- Name: PaperSegment_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PaperSegment_Id_seq"', 4, true);


--
-- Name: PaperVersion_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PaperVersion_Id_seq"', 1, false);


--
-- Name: Paper_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Paper_Id_seq"', 1, true);


--
-- Name: SegmentFeedback_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SegmentFeedback_Id_seq"', 11, true);


--
-- Name: SegmentVersion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SegmentVersion_id_seq"', 4, true);


--
-- Name: Segment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Segment_id_seq"', 4, true);


--
-- Name: Users_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_Id_seq"', 4, true);


--
-- PostgreSQL database dump complete
--

