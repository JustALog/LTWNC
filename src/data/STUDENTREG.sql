CREATE DATABASE IF NOT EXISTS STUDENTREG;
USE STUDENTREG;

DROP TABLE IF EXISTS LEARN_PREFERENCE;
DROP TABLE IF EXISTS TOPICS;
DROP TABLE IF EXISTS STUDENT_ENROLLMENT;
DROP TABLE IF EXISTS MODULES;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS TUTOR;

CREATE TABLE IF NOT EXISTS TUTOR (
  Tut_Id VARCHAR(10) NOT NULL,
  TName VARCHAR(45) NOT NULL,
  DoB DATE NOT NULL,
  HOURS DECIMAL(4,2),
  PRIMARY KEY (Tut_Id)
);

CREATE TABLE IF NOT EXISTS STUDENT (
  SID VARCHAR(10) NOT NULL,
  SNAME VARCHAR(30) NOT NULL,
  EMAIL VARCHAR(30) NOT NULL UNIQUE,
  Tutor_Id VARCHAR(10) NULL,
  PRIMARY KEY (SID),
  CONSTRAINT fk_student_tutor
    FOREIGN KEY (Tutor_Id)
    REFERENCES TUTOR (Tut_Id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS MODULES (
  MID VARCHAR(15) NOT NULL,
  MNAME VARCHAR(40) NOT NULL,
  LEVEL TINYINT,
  TUTOR_Tut_Id VARCHAR(10),
  PRIMARY KEY (MID),
  CONSTRAINT fk_module_tutor
    FOREIGN KEY (TUTOR_Tut_Id)
    REFERENCES TUTOR (Tut_Id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS STUDENT_ENROLLMENT (
  SID VARCHAR(10) NOT NULL,
  MID VARCHAR(15) NOT NULL,
  ACAD_YEAR VARCHAR(10) NOT NULL,
  PRIMARY KEY (SID, MID, ACAD_YEAR),
  CONSTRAINT fk_enrol_student
    FOREIGN KEY (SID)
    REFERENCES STUDENT(SID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_enrol_module
    FOREIGN KEY (MID)
    REFERENCES MODULES(MID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS TOPICS (
  TId INT NOT NULL,
  TopicDescription VARCHAR(100),
  Mod_Id VARCHAR(15),
  PRIMARY KEY (TId),
  CONSTRAINT fk_topics_module
    FOREIGN KEY (Mod_Id)
    REFERENCES MODULES (MID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS LEARN_PREFERENCE (
  Stud_Id VARCHAR(10) NOT NULL,
  TPreference VARCHAR(50),
  APreference VARCHAR(50),
  PRIMARY KEY (Stud_Id),
  CONSTRAINT fk_learningpref_student
    FOREIGN KEY (Stud_Id)
    REFERENCES STUDENT (SID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO TUTOR VALUES
('1000','Rong Yang','1982-01-01',4),
('1001','Kun Wei','1987-01-01',3),
('1002','Kamran Soomro','1985-01-01',4),
('1003','Jun Hong','1970-01-01',1),
('1004','Zaheer Khan','1980-01-10',NULL),
('1005','Martin Serpell','1981-01-31',NULL),
('1006','Elias Piminides','1980-02-02',NULL),
('1007','Jim Smith','1970-02-02',NULL),
('1008','Barkha Javed','1995-01-01',NULL),
('1009','Shelan Jeawak','1995-02-02',NULL);

INSERT INTO STUDENT VALUES
('1000','Abdul Basit Chaudhry','abc@abc.com','1003'),
('1001','Daniel Everret Fernandes','def@def.com','1000'),
('1002','Gigi Hadi Ingram','ghi@ghi.com','1001'),
('1003','Jacob Knowle Lewis','jkl@jkl.com','1002'),
('1004','Martin Newton Oolu','mno@mno.com','1002'),
('1005','Patrick Quinn Rogers','pqr@pqr.com','1002'),
('1006','Shabaz Tanveer Ucch','stu@stu.com','1001'),
('1007','Umar Victor Qayyum','uvq@stu.com','1001'),
('1008','Qais Russell Stuart','qrs@qrs.com','1000'),
('1009','Rachel Shaw Trump','rst@rst.com','1000'),
('1010','Tania Uno Victoria','tuv@tuv.com','1000'),
('1011','Umber Vishal Xavier','uvx@uvx.com','1002'),
('1012','James Baker','jb@jb.com',NULL);

INSERT INTO MODULES VALUES
('101','Web Programming',1,'1004'),
('102','Web Design',1,'1000'),
('103','CMS',1,'1000'),
('104','E-Commerce',1,'1000'),
('105','Advanced Programming',2,'1002'),
('106','Advanced Databases',2,'1006'),
('107','Artificial Intelligence',2,'1005'),
('108','Machine Learning',2,'1005'),
('109','Data Science',2,'1002'),
('110','Project Workshops',3,'1006'),
('111','Data Analytics and Visualisation',3,'1002'),
('112','Distributed and Parallel computing',3,'1004'),
('114','Cyber Security',3,'1006'),
('115','Deep Learning',3,'1002'),
('116','Computing Project',3,'1004'),
('117','Placement',3,'1001'),
('118','Requirements Engineering',3,'1001'),
('119','Web Development and DB',1,NULL),
('120','Networks',3,NULL);

INSERT INTO STUDENT_ENROLLMENT VALUES
('1000','101','2014-2015'),
('1000','102','2014-2015'),
('1001','101','2014-2015'),
('1001','103','2014-2015'),
('1001','104','2014-2015'),
('1002','104','2014-2015'),
('1000','105','2015-2016'),
('1000','106','2015-2016'),
('1001','107','2015-2016'),
('1001','108','2015-2016'),
('1002','103','2015-2016'),
('1002','105','2015-2016'),
('1003','110','2015-2016'),
('1003','111','2015-2016'),
('1004','103','2015-2016'),
('1004','105','2015-2016'),
('1004','110','2015-2016'),
('1004','115','2015-2016'),
('1005','117','2016-2017'),
('1006','117','2017-2018'),
('1007','117','2017-2018'),
('1005','116','2018-2019'),
('1007','116','2018-2019'),
('1007','115','2018-2019'),
('1007','114','2018-2019');

INSERT INTO TOPICS VALUES
(1,'conceptual datamodel','106'),
(2,'logical datamodel','106'),
(3,'physical datamodel','106'),
(4,'relational datamodel','106'),
(5,'SQL','106'),
(6,'NoSQL','106'),
(7,'Flask','101'),
(8,'HTML','101'),
(9,'JavaScript','101'),
(10,'OOP','105'),
(11,'Web Security','101'),
(12,'Responsive Design','102'),
(13,'Responsive Design','101'),
(14,'Lambda Functions','105'),
(15,'SDLC','110'),
(16,'Data management','103'),
(17,'Data management','104'),
(18,'Data management','106'),
(19,'Data management','107'),
(20,'Data management','108'),
(21,'Data management','109'),
(22,'Data management','111'),
(23,'Data management','114'),
(24,'Data management','115'),
(25,'Data management','118'),
(26,'Project management','117'),
(27,'Software processes','117'),
(28,'Software processes','116'),
(29,'HTTP request and response',NULL);

INSERT INTO LEARN_PREFERENCE VALUES
('1000','Online','No Exam'),
('1001','Online','Project'),
('1002','F-2-F','Project'),
('1003','Blended','No Exam'),
('1004','F-2-F','Coursework');

COMMIT;
