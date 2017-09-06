CREATE TABLE LM_ORGANIZATION(
	ORGANIZATION_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ORGANIZATION_NAME VARCHAR(300) NOT NULL
);

CREATE TABLE LM_REPOSITORY(
	REPOSITORY_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	REPOSITORY_NAME VARCHAR(300) NOT NULL,
	REPOSITORY_LANGUAGE VARCHAR(50),
	REPOSITORY_BUILDABLE BOOLEAN DEFAULT NULL,
	REPOSITORY_PRIVATE BOOLEAN DEFAULT NULL,
	REPOSITORY_DESCRIPTION LONG VARCHAR,
	REPOSITORY_GROUPID VARCHAR(100),
	REPOSITORY_LICENSE INT(11),
	REPOSITORY_TEAM INTEGER,
	REPOSITORY_ORGANIZATION INTEGER,
	REPOSITORY_TYPE INTEGER,
	REPOSITORY_ACTIVE BOOLEAN DEFAULT NULL,
	REPOSITORY_ACCEPT BOOLEAN DEFAULT NULL,

	FOREIGN KEY (REPOSITORY_LICENSE) REFERENCES LM_LICENSE(LICENSE_ID),
	FOREIGN KEY (REPOSITORY_TEAM) REFERENCES LM_TEAM(TEAM_ID),
	FOREIGN KEY (REPOSITORY_ORGANIZATION) REFERENCES LM_ORGANIZATION(ORGANIZATION_ID),
	FOREIGN KEY (REPOSITORY_TYPE) REFERENCES LM_REPOSITORYTYPE(REPOSITORYTYPE_ID)

)ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

CREATE TABLE LM_REPOSITORYTYPE(
	REPOSITORYTYPE_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	REPOSITORYTYPE_NAME VARCHAR(300) NOT NULL,
	REPOSITORYTYPE_JENKINS BOOLEAN DEFAULT NULL,
	REPOSITORYTYPE_NEXUS BOOLEAN DEFAULT NULL
);

CREATE TABLE LM_TEAM(
	TEAM_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TEAM_NAME VARCHAR(100) NOT NULL
);

#########################################################################################################################################

INSERT INTO LM_REPOSITORYTYPE VALUES
(1,"Component(Carbon)",1,1),
(2,"Product",0,0),
(3,"Forked Repository",0,0),
(4,"Extensions",0,0),
(5,"WSO2 Components",0,0),
(6,"Other",0,0);


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


