DROP EXTENSION PGCRYPTO;

DROP TRIGGER IF EXISTS give_default_programs ON employees;
DROP TRIGGER IF EXISTS audit_update ON password_history;
DROP TRIGGER IF EXISTS update_password_history ON employees;
DROP TRIGGER IF EXISTS trig_copy ON Active_Requests;


DROP FUNCTION IF EXISTS assign_default_programs();
DROP FUNCTION IF EXISTS hash(password VARCHAR(20));
DROP FUNCTION IF EXISTS update_audit_log();
DROP FUNCTION IF EXISTS function_copy_password();
DROP FUNCTION IF EXISTS function_copy_requests();

DROP VIEW IF EXISTS employee_programs;
DROP VIEW IF EXISTS valid_programs;
DROP VIEW IF EXISTS who_am_I_managing;
DROP VIEW IF EXISTS manager_manages;
DROP VIEW IF EXISTS employees_in_new_york;
DROP VIEW IF EXISTS frequent_requests;
DROP VIEW IF EXISTS pending_requests;
DROP VIEW IF EXISTS managed;
DROP VIEW IF EXISTS managers;
DROP VIEW IF EXISTS jobs_with_default_programs;
DROP VIEW IF EXISTS personalinformation;


DROP TYPE IF EXISTS Access_Types CASCADE;
DROP TYPE IF EXISTS Statuses CASCADE;
DROP TYPE IF EXISTS Department_Name CASCADE;

DROP TABLE IF EXISTS Jobs CASCADE;
DROP TABLE IF EXISTS Offices CASCADE;
DROP TABLE IF EXISTS Employees CASCADE;
DROP TABLE IF EXISTS Password_History CASCADE;
DROP TABLE IF EXISTS Programs CASCADE;
DROP TABLE IF EXISTS Active_Requests CASCADE;
DROP TABLE IF EXISTS Request_History CASCADE;
DROP TABLE IF EXISTS valid_Program_Levels CASCADE;
DROP TABLE IF EXISTS Default_Programs CASCADE;
DROP TABLE IF EXISTS Accessible_Programs CASCADE;
DROP TABLE IF EXISTS Manages CASCADE;
DROP TABLE IF EXISTS Audit_Log CASCADE;

CREATE TYPE Access_Types AS ENUM('Default', 'Administrator', 'Data Entry', 'Programmer', 'Manager');
CREATE TYPE Statuses AS ENUM('Approved', 'Denied', 'Pending');
CREATE TYPE Department_Name AS ENUM('Accounting', 'Information Technology', 'Human Resources', 'Sales');

CREATE EXTENSION PGCRYPTO;

CREATE TABLE IF NOT EXISTS Jobs(
	Job_ID SERIAL NOT NULL,
	Job_Title VARCHAR NOT NULL,
    Department_ID Department_Name,
    PRIMARY KEY (Job_ID)
	);

CREATE TABLE IF NOT EXISTS Offices(
    Office_ID SERIAL NOT NULL,
    Country VARCHAR NOT NULL,
    City VARCHAR NOT NULL,
    UNIQUE (Office_ID),
    PRIMARY KEY (Office_ID)
	);

CREATE TABLE IF NOT EXISTS Employees(
    Username VARCHAR NOT NULL ,
    Job_ID SERIAL NOT NULL,
    First_Name VARCHAR NOT NULL,
    Middle_Initial VARCHAR,
    Last_Name VARCHAR NOT NULL,
    Work_Phone_Number VARCHAR NOT NULL,
    Office_ID SERIAL NOT NULL,
    Biography VARCHAR,
    Password VARCHAR,
    Password_Expiration_Date DATE,
    Last_Login TIMESTAMP,
    PRIMARY KEY (Username),
    FOREIGN KEY (Job_ID) REFERENCES Jobs(Job_ID),
    FOREIGN KEY (Office_ID) REFERENCES Offices(Office_ID)
	);

CREATE TABLE IF NOT EXISTS Password_History(
	Username VARCHAR NOT NULL,
	Time_changed TIMESTAMP NOT NULL,
	Password VARCHAR NOT NULL,
	FOREIGN KEY (Username) REFERENCES Employees(Username),
	PRIMARY KEY (Username, Time_changed, Password)
	);

CREATE TABLE IF NOT EXISTS Programs(
	Program_ID SERIAL NOT NULL,
	Program_Name VARCHAR NOT NULL,
	Description VARCHAR,
	Version VARCHAR,
	UNIQUE(Program_Name),
	PRIMARY KEY (Program_ID)
	);

CREATE TABLE IF NOT EXISTS valid_Program_Levels(
	Program_ID SERIAL NOT NULL,
	Access_Level Access_Types,
	FOREIGN KEY (Program_ID) REFERENCES Programs(Program_ID),
	PRIMARY KEY (Program_ID,Access_Level)
	);

CREATE TABLE IF NOT EXISTS Active_Requests(
    Username VARCHAR NOT NULL,
    Program_ID SERIAL NOT NULL,
    Comment VARCHAR NOT NULL,
    Last_Updated TIMESTAMP,
    Status Statuses NOT NULL,
    Access_Level Access_Types NOT NULL,
    Modified_By VARCHAR ,
    FOREIGN KEY (Modified_By) REFERENCES Employees(Username),
    FOREIGN KEY (Access_Level, Program_ID) REFERENCES valid_Program_Levels(Access_Level, Program_ID),
    FOREIGN KEY (Username) REFERENCES Employees(Username),
    FOREIGN KEY (Program_ID) REFERENCES Programs(Program_ID),
    PRIMARY KEY (Username, Program_ID, Access_Level, Status, Modified_By)
	);

CREATE TABLE IF NOT EXISTS Request_History(
	Username VARCHAR NOT NULL,
    Program_ID SERIAL NOT NULL,
    Comment VARCHAR NOT NULL,
    Last_Updated TIMESTAMP,
    Status Statuses,
    Access_Level Access_Types,
    Modified_By VARCHAR,
    FOREIGN KEY (Modified_By) REFERENCES Employees(Username),
    FOREIGN KEY (Access_Level, Program_ID) REFERENCES valid_Program_Levels(Access_Level, Program_ID),
    FOREIGN KEY (Username) REFERENCES Employees(Username),
    FOREIGN KEY (Program_ID) REFERENCES Programs(Program_ID),
    PRIMARY KEY (Username, Program_ID, Access_Level, Status, Modified_By)
	);


CREATE TABLE IF NOT EXISTS Default_Programs(
	Job_ID SERIAL NOT NULL,
	Program_ID SERIAL NOT NULL,
	Access_Level Access_Types,
	FOREIGN KEY (Program_ID) REFERENCES Programs(Program_ID),
	FOREIGN KEY (Access_Level, Program_ID) REFERENCES valid_Program_Levels(Access_Level, Program_ID),
	FOREIGN KEY (Job_ID) REFERENCES Jobs(Job_ID),
	PRIMARY KEY (Job_ID, Program_ID)
	);

CREATE TABLE IF NOT EXISTS Accessible_Programs(
	Username VARCHAR NOT NULL,
	Program_ID INTEGER NOT NULL,
	Access_Level Access_Types,
	FOREIGN KEY (Username) REFERENCES Employees(Username),
    FOREIGN KEY (Program_ID) REFERENCES Programs(Program_ID),
    PRIMARY KEY (Username, Program_ID)
	);

CREATE TABLE IF NOT EXISTS Manages(
    Manager_Username VARCHAR NOT NULL,
    Managed_Username VARCHAR NOT NULL,
    FOREIGN KEY (Manager_Username) REFERENCES Employees(Username),
    FOREIGN KEY (Managed_Username) REFERENCES Employees(Username),
    PRIMARY KEY (Manager_Username, Managed_Username)
	);

CREATE TABLE IF NOT EXISTS Audit_Log(
	Username VARCHAR NOT NULL,
	Login_Time TIMESTAMP,
	Program_Used VARCHAR,
    PRIMARY KEY (Login_Time, Username)
	);

CREATE VIEW employee_programs AS
    SELECT p.Program_ID, e.Username, p.Program_Name, a.Access_Level
    FROM Employees e, Accessible_Programs a, Programs p
    WHERE e.username = a.username AND p.Program_ID = a.Program_ID
    ;

CREATE VIEW valid_programs AS
    SELECT p.program_Id, p.Program_Name, v.Access_Level, p.Description
    FROM Valid_Program_Levels v, Programs p
    WHERE p.Program_ID = v.Program_ID
    ;

-- a view that shows all employees personal information, minus information that shouldnt be shared
CREATE VIEW personalinformation AS
    SELECT Username, jobs.Job_title, First_Name, Last_Name, Work_Phone_Number, Offices.city, Offices.country, Biography
    FROM Employees, jobs, offices
    WHERE employees.job_id = jobs.job_id AND employees.office_id = offices.office_id
    ;
------

-- a view that shows all jobs that have default programs 
CREATE VIEW jobs_with_default_programs AS
	SELECT jobs.Job_title, programs.program_name
	FROM  default_programs,jobs, programs
	WHERE default_programs.job_id = jobs.job_id AND default_programs.program_id = programs.program_id
	;
------

-- a view that shows all employees that are managers 
CREATE VIEW managers AS
	SELECT username, first_name, last_name
	FROM Manages INNER JOIN Employees ON ( manages.manager_username = employees.username )
  	;
------

-- a view that shows all employees that are being managed by managers
CREATE VIEW managed AS
	SELECT username, first_name, last_name
	FROM Manages INNER JOIN Employees ON ( manages.manager_username = employees.username )
	;
------

-- a view that shows all pending requests 
CREATE VIEW pending_requests AS
	SELECT Username, Program_ID, Comment, Last_Updated, Status, Access_Level
	FROM active_requests
	WHERE Status = 'Pending'
	;
------

-- Find all requests of the same program with same job title or same department (frequent job requests)
CREATE VIEW frequent_requests AS
	SELECT active_requests.program_ID, active_requests.username, jobs.job_id
	FROM active_requests,employees, jobs
	WHERE active_requests.username = employees.username AND employees.job_id = jobs.job_id
	ORDER BY active_requests.program_ID
	;
------
-- See what employees are in what office
DROP VIEW IF EXISTS employees_in_new_york;
CREATE VIEW employees_in_new_york AS
	SELECT offices.country, offices.city, employees.username
	FROM offices, employees
	WHERE employees.office_id = offices.office_id AND offices.city = 'New York'
	;
------

--see everyone who my manager manages	
CREATE VIEW manager_manages AS
	SELECT p.username, p.job_title, p.first_name, p.last_name, p.work_phone_number, p.city, p.country, p.biography
	FROM personalinformation AS p, manages AS m1, manages AS m2
	WHERE m1.managed_username = 'ldapp' AND
     	  m2.manager_username = m1.manager_username AND
      	  p.username = m2.managed_username
      	  ;
------

-- manager sees everyone who they are managing-------------------------------------------------------
CREATE VIEW who_am_I_managing AS
	SELECT p.username, p.job_title, p.first_name, p.last_name, p.work_phone_number, p.city, p.country, p.biography
	FROM personalinformation AS p, manages AS m1, manages AS m2
	WHERE m1.manager_username = 'djsnydes' AND
       	  m2.managed_username = m1.managed_username AND
      	  p.username = m2.managed_username
      	  ;
-------------------------------------------------------

-------------------------updating request history-------------------------
CREATE OR REPLACE FUNCTION function_copy_requests() RETURNS TRIGGER AS
'
BEGIN
    INSERT INTO request_history(Username, Program_ID, Comment, Last_Updated, Status, Access_Level, Modified_By)
        VALUES(OLD.Username, OLD.Program_ID, OLD.Comment, OLD.Last_Updated, OLD.Status, OLD.Access_Level, OLD.Modified_By);
        RETURN NEW;
END;
'
language plpgsql;

CREATE TRIGGER trig_copy
     AFTER UPDATE ON Active_Requests
     FOR EACH ROW
     EXECUTE PROCEDURE function_copy_requests();

-- copies password to password history and deletes oldest password if grows greater than 10--
CREATE OR REPLACE FUNCTION function_copy_password() RETURNS trigger AS
'
BEGIN
	IF (NEW.password) = (SELECT e.password FROM Employees as e WHERE (OLD.username = e.username)) THEN
        RETURN NULL;
	ELSE
		IF (NEW.password) IN (SELECT password FROM password_history WHERE (OLD.username = username)) THEN
    	   	RETURN NULL;
    	ELSE
            IF (SELECT COUNT(password_history.username)
                FROM password_history
                WHERE password_history.username = new.username) < 10 THEN
              INSERT INTO password_history(Username, Time_changed, Password)
   			 	VALUES(OLD.Username, NOW(), OLD.Password);
			  RETURN NEW;
            ELSE
      			UPDATE password_history SET (Time_Changed, password) = (NOW(), OLD.password)
	  			WHERE Time_changed IN (SELECT Time_changed
                                       FROM password_history
                                       WHERE username = NEW.username
                                       ORDER BY Time_changed
                                       ASC LIMIT 1);
      			RETURN NEW;
            END IF;
    	END IF;
    END IF;
END;
'
LANGUAGE plpgsql;

CREATE TRIGGER update_password_history
     BEFORE UPDATE ON Employees
     FOR EACH ROW
     EXECUTE PROCEDURE function_copy_password();

--------------------------- auditlog--------------------------

CREATE OR REPLACE FUNCTION update_audit_log() RETURNS trigger AS
'
BEGIN
	IF password = (SELECT password FROM Employees, Accessible_Programs WHERE username = NEW.USERNAME) THEN
    	INSERT INTO audit_log(Username, Login_Time, Program_Used)
        	VALUES(OLD.Username, NOW(), OLD.Program_Used);
			RETURN NEW;
	ELSE
		RETURN NULL;
	END IF;
END;
'
language plpgsql;


CREATE TRIGGER audit_update
     BEFORE UPDATE ON password_history
     FOR EACH ROW
     EXECUTE PROCEDURE update_audit_log();

--assigns logging in as default program to all empyloyees*/

-----------------------encrypt passwords------------------
CREATE OR REPLACE FUNCTION hash(password VARCHAR(20)) RETURNS bytea AS
'
BEGIN
   return  ENCODE(DIGEST(password,"sha256"),"hex");
END;
'
LANGUAGE plpgsql;

--------------------assign default programs------
CREATE OR REPLACE FUNCTION assign_default_programs() RETURNS trigger AS
'
BEGIN
	IF (NEW.job_id) IN (SELECT job_ID FROM default_programs AS d WHERE (NEW.job_id =d.job_id)) THEN
         INSERT INTO accessible_programs(Username, Program_ID, Access_Level)
		 SELECT NEW.Username, Program_ID, Access_Level
		 FROM default_programs
		 WHERE ((NEW.job_id) = (SELECT job_ID FROM default_programs AS d WHERE (NEW.job_id = d.job_id) LIMIT 1));
         return NEW;
    ELSE
    	 RETURN NULL;
    END IF;
END;
'
language plpgsql;

CREATE TRIGGER give_default_programs
    AFTER INSERT OR UPDATE ON employees
    FOR EACH ROW
    EXECUTE PROCEDURE assign_default_programs();
