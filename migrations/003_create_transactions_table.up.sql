CREATE TABLE transactions (
	id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
   amount MONEY NOT NULL,
	"type" dc not NULL,
	"datetime" TIMESTAMP NOT NULL
);