create table private_message(
   message_date DATE,
   from1 int,
   to1 int,
   subject VARCHAR(255),       
   body VARCHAR(255),
   foreign key(from1) references user_info(id),
   foreign key (to1) references user_info(id)
);
create table group_message(
   message_date DATE,
   from1 int,
   groupid int,
   subject VARCHAR(255),
   body VARCHAR(255),
   foreign key(from1) references user_info(id),
   foreign key (groupid) references artist_fan_group(groupid)
);
