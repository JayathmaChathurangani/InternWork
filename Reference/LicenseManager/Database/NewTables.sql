CREATE TABLE LM_ORGANIZATION(
	ORGANIZATION_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ORGANIZATION_NAME VARCHAR(300) NOT NULL
);

CREATE TABLE LM_REPOSITORYTYPE(
	REPOSITORYTYPE_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	REPOSITORYTYPE_NAME VARCHAR(300) NOT NULL,
);

CREATE TABLE LM_TEAM(
	TEAM_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TEAM_NAME VARCHAR(100) NOT NULL
);
 
CREATE TABLE LM_REPOSITORY(
	REPOSITORY_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	REPOSITORY_NAME VARCHAR(300) NOT NULL,
	REPOSITORY_LANGUAGE VARCHAR(50),
	REPOSITORY_BUILDABLE BOOLEAN DEFAULT 0,
	REPOSITORY_NEXUS BOOLEAN DEFAULT 0,
	REPOSITORY_PRIVATE BOOLEAN DEFAULT 0,
	REPOSITORY_DESCRIPTION LONG VARCHAR,
	REPOSITORY_GROUPID VARCHAR(100),
	REPOSITORY_LICENSE INT(11),
	REPOSITORY_TEAM INTEGER,
	REPOSITORY_ORGANIZATION INTEGER,
	REPOSITORY_TYPE INTEGER,
	REPOSITORY_ACTIVED BOOLEAN DEFAULT NULL,
	REPOSITORY_ACCEPT BOOLEAN DEFAULT NULL,
	REPOSITORY_REQUEST_BY VARCHAR(100) NOT NULL,
	REPOSITORY_ACCEPTED_BY VARCHAR(100) DEFAULT NULL,
	REPOSITORY_DEACTIVATED_BY VARCHAR(100) DEFAULT NULL,
	REPOSITORY_DEACTIVATED_REASON LONG VARCHAR DEFAULT NULL,
	REPOSITORY_BPMN_TASK_ID INTEGER DEFAULT 0,
	REPOSITORY_BPMN_PROCESS_ID INTEGER DEFAULT 0,

	FOREIGN KEY (REPOSITORY_LICENSE) REFERENCES LM_LICENSE(LICENSE_ID),
	FOREIGN KEY (REPOSITORY_ORGANIZATION) REFERENCES LM_ORGANIZATION(ORGANIZATION_ID),
	FOREIGN KEY (REPOSITORY_TYPE) REFERENCES LM_REPOSITORYTYPE(REPOSITORYTYPE_ID),

	UNIQUE(REPOSITORY_NAME)

)ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

CREATE TABLE LM_USER(
	USER_EMAIL VARCHAR(300) NOT NULL PRIMARY KEY,
	USER_NAME VARCHAR(100) NOT NULL,
	USER_PERMISSION ENUM('ALL','ACCEPT','REMOVE','READ'),
	USER_TOKEN VARCHAR(300) DEFAULT NULL
);

#########################################################################################################################################

INSERT INTO LM_REPOSITORYTYPE VALUES
(1,"Component(Carbon)"),
(2,"Product"),
(3,"Forked Repository"),
(4,"Extensions"),
(5,"WSO2 Components"),
(6,"Other");


INSERT INTO LM_ORGANIZATION VALUES
(1,"WSO2"),
(2,"WSO2 Extensions"),
(3,"WSO2 Incubator"),
(4,"Ballerinalang"),
(5,"WSO2 Support");


INSERT INTO LM_TEAM VALUES
(1,"Analytics"),
(2,"Internal Apps"),
(3,"Platform Security");


INSERT INTO LM_TEAM VALUES
("Ballerinalang");

INSERT INTO LM_USER VALUES
('webmisproject@gmail.com','Buddhi','ALL'),
('buddhik@wso2.com','Buddhi','ACCEPT'),
('b.wathsala.bw@gmail.com','Wathsala','ACCEPT');

