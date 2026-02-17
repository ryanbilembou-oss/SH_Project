package pass_hash

import (
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) { // password ce qu'on entre en string et la deuxieme parenthese c'est (1,2) 1 = pass hasher 2= si ya une error 
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}