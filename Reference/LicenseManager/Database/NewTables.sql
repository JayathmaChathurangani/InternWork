CREATE TABLE LM_ORGANIZATION(
	ORGANIZATION_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ORGANIZATION_NAME VARCHAR(300) NOT NULL
);

CREATE TABLE LM_REPOSITORYTYPE(
	REPOSITORYTYPE_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	REPOSITORYTYPE_KEY VARCHAR(100) NOT NULL,
	REPOSITORYTYPE_NAME VARCHAR(300) NOT NULL
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

CREATE TABLE LM_JENKINSFOLDER(
	JF_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	JF_REGEX VARCHAR(200) NOT NULL,
	JF_VIEW VARCHAR(200) NOT NULL,
	JF_FOLDER VARCHAR(200) NOT NULL,
	JF_CONF VARCHAR(300) NOT NULL,

);



#########################################################################################################################################

INSERT INTO LM_REPOSITORYTYPE VALUES
(1,"carbon","Component(Carbon)"),
(2,"product","Product"),
(3,"forked","Forked Repository"),
(4,"extensions","Extensions"),
(5,"components","WSO2 Components"),
(6,"other","Other");


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

INSERT INTO LM_JENKINSFOLDER VALUES
(1,'^analytycs.*','analytics','analytics-products','analyticsJenkinsConf.xml'),
(2,'^ballerina.*','ballerina','Ballerina','ballerinaJenkins.xml'),
(3,'^esb-connector.*','esb-extensions','extensions');


####################################################################################################################################
DELIMITER //

CREATE  PROCEDURE JEN(IN JENKINSNAME VARCHAR(300))


BEGIN
	
	DECLARE JFID VARCHAR(200);
    DECLARE FLAG BOOLEAN;
    
    DECLARE CUR CURSOR FOR SELECT JF_REGEX FROM LM_JENKINSFOLDER;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET FLAG=FALSE;
    CREATE TABLE  IF NOT EXISTS LM_JENKINSFOLDER_TEMP(
	JF_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	JF_REGEX VARCHAR(200) NOT NULL,
	JF_VIEW VARCHAR(200) NOT NULL,
	JF_FOLDER VARCHAR(200) NOT NULL,
	JF_CONF VARCHAR(300) NOT NULL
	);
    
    OPEN CUR;
    SET FLAG=TRUE;
    FETCH CUR INTO JFID;
    
    WHILE FLAG=TRUE DO
		IF JENKINSNAME REGEXP JFID THEN 
			INSERT INTO LM_JENKINSFOLDER_TEMP(JF_REGEX,JF_VIEW,JF_FOLDER,JF_CONF) SELECT JF_REGEX,JF_VIEW,JF_FOLDER,JF_CONF FROM LM_JENKINSFOLDER WHERE JF_REGEX= JFID;
		END IF;
		FETCH CUR INTO JFID;
    END WHILE;
    SELECT * FROM LM_JENKINSFOLDER_TEMP;
    DROP TABLE IF EXISTS LM_JENKINSFOLDER_TEMP;
    CLOSE CUR;
END //


########################################################################################################################################
CREATE TABLE LM_TEAM(
	TEAM_ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	TEAM_NAME VARCHAR(100) NOT NULL
);

