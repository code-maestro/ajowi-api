create table if not exists auth
(
    auth_id        varchar(60) default (uuid()) not null
        primary key,
    login_id       varchar(60)                  not null,
    user_role_flag char                         not null comment 'U - user, T - tour_guide, A - Sys_admin',
    password       varchar(200)                 not null,
    user_name      varchar(120)                 not null
);

create table if not exists post_comments
(
    comment_id varchar(60)  not null
        primary key,
    comment    varchar(120) not null,
    user_id    varchar(60)  null,
    post_id    varchar(60)  not null
);

create table if not exists posts
(
    post_id          varchar(60)   not null
        primary key,
    post_title       varchar(50)   not null,
    post_description varchar(255)  not null,
    location         varchar(60)   not null,
    likes_counter    int default 0 not null,
    guide_id         varchar(60)   not null,
    media_url        varchar(200)  not null comment 'Post media, photos and videos'
);

create table if not exists tour_activities
(
    activity_id   varchar(60) default (uuid()) not null
        primary key,
    title         varchar(60)                  null,
    description   varchar(255)                 not null,
    tour_guide_id varchar(65)                  not null,
    fee_per_hour  int                          not null,
    fee_currency  char(3)     default 'UGX'    not null,
    media_url     varchar(120)                 not null
);

create table if not exists tour_guide
(
    tour_guide_id   varchar(60)  not null
        primary key,
    first_name      varchar(50)  not null,
    middle_name     varchar(50)  null,
    surname         varchar(50)  not null,
    dob             date         not null,
    location        varchar(45)  not null,
    bio_description varchar(120) not null,
    email           varchar(45)  not null,
    phone_number    varchar(15)  not null,
    constraint email
        unique (email),
    constraint phone_number
        unique (phone_number)
);

create index tour_guide_tour_guide_id_index
    on tour_guide (tour_guide_id);

create table if not exists users
(
    user_id       varchar(65) default (uuid())          not null
        primary key,
    first_name    varchar(50)                           not null,
    last_name     varchar(50)                           not null,
    phone_number  varchar(12)                           not null,
    middle_name   varchar(45)                           null,
    created_date  datetime    default CURRENT_TIMESTAMP not null,
    email_address varchar(60)                           not null,
    dob           date                                  not null
);

create or replace definer = derek@`%` view authenticate_guide as
select `a`.`email`     AS `email`,
       `b`.`user_name` AS `user_name`,
       `b`.`password`  AS `password`,
       `b`.`login_id`  AS `login_id`
from `ajowi`.`tour_guide` `a`
         join `ajowi`.`auth` `b`
where (`a`.`tour_guide_id` = `b`.`login_id`);

create or replace definer = derek@`%` view authenticate_user as
select `a`.`email_address` AS `email_address`,
       `b`.`user_name`     AS `user_name`,
       `b`.`password`      AS `password`,
       `b`.`login_id`      AS `login_id`
from `ajowi`.`users` `a`
         join `ajowi`.`auth` `b`
where (`a`.`user_id` = `b`.`login_id`);

create
    definer = derek@`%` procedure register_guide(IN fname varchar(60), IN mname varchar(60), IN lname varchar(60),
                                                 IN phone_no varchar(12), IN mail varchar(60), IN locate varchar(120),
                                                 IN bio_desc varchar(256), IN birth_date date, IN username varchar(100),
                                                 IN pwd varchar(50), OUT sqlMessage varchar(80))
BEGIN

    DECLARE user_count int(120);
    SET @TOUR_GUIDE_ID := UUID();

    SELECT COUNT(email) INTO user_count FROM tour_guide WHERE email = mail;

    IF user_count > 0 THEN

        SELECT CONCAT(mail, ' already exists, Please Login to Continue ! ') INTO sqlMessage;
        SELECT sqlMessage;

    ELSE

        INSERT INTO tour_guide (tour_guide_id, first_name, middle_name, surname, phone_number, email, location,
                                bio_description, dob)
        VALUES (@TOUR_GUIDE_ID, fname, mname, lname, phone_no, mail, locate, bio_desc, birth_date);

        INSERT INTO auth (LOGIN_ID, USER_ROLE_FLAG, PASSWORD, USER_NAME)
        VALUES (@TOUR_GUIDE_ID, 'T', TO_BASE64(AES_ENCRYPT(pwd, username)), username);

        SELECT ' TOUR_GUIDE CREATED SUCCESSFULLY ! ' INTO sqlMessage;
        SELECT sqlMessage;

    END IF;

END;

create
    definer = derek@`%` procedure register_user(IN fname varchar(60), IN mname varchar(60), IN lname varchar(60),
                                                IN phone_no varchar(12), IN mail varchar(60), IN birth_date date,
                                                IN username varchar(100), IN pwd varchar(50),
                                                OUT sqlMessage varchar(80))
BEGIN

    DECLARE user_count int(120);
    SET @USER_ID := UUID();

    SELECT COUNT(email_address) INTO user_count FROM users WHERE email_address = mail;

    IF user_count > 0 THEN

        SELECT CONCAT(mail, ' already exists, Please Login to Continue ! ') INTO sqlMessage;

        SELECT sqlMessage;

    ELSE

        INSERT INTO users (user_id, first_name, middle_name, last_name, phone_number, email_address, dob)
        VALUES (@USER_ID, fname, mname, lname, phone_no, mail, birth_date);

        INSERT INTO auth (LOGIN_ID, USER_ROLE_FLAG, PASSWORD, USER_NAME)
        VALUES (@USER_ID, 'U', TO_BASE64(AES_ENCRYPT(pwd, username)), username);

        SELECT ' USER CREATED SUCCESSFULLY ! ' INTO sqlMessage;

        SELECT sqlMessage;

    END IF;

END;

