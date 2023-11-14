package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"net/http"

	_ "github.com/lib/pq"
)

type application struct {
	db *sql.DB
}

func (app *application) index(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Inside index function")
	if r.Method == "POST" {
		r.ParseForm()
		name := r.FormValue("Name")
		phoneNo := r.FormValue("phone")
		msg := r.FormValue("message")

		// 	stmt, err := app.db.Prepare("INSERT INTO MESSAGES (Name, PhoneNo, Msg) values(?, ?, ?);")
		// 	if err != nil {
		// 		fmt.Printf("%v", err)
		// 	} else {
		// 		defer stmt.Close()
		// 		_, err = stmt.Exec(name, phoneNo, msg)
		// 		if err != nil {
		// 			fmt.Printf("%v", err)
		// 		}
		// 	}
		// }

		query := "INSERT INTO MESSAGES (Name, PhoneNo, Msg) values($1, $2, $3)"
		err := app.db.QueryRow(query, name, phoneNo, msg)
		if err != nil {
			return
		}
	}
	tmpl, err := template.ParseFiles("m1.html")
	if err != nil {
		fmt.Println("could not find m1")
		return
	}

	tmpl.Execute(w, nil)
}

func main() {

	// db, err := sql.Open("mysql", "root:freeroam@tcp(localhost:3306)/test")
	// if err != nil {
	// 	return
	// }

	db, err := sql.Open("postgres", "postgres://usermessages_k0v6_user:E7FQKLQ0MhPxlg4Syn8DnWWsMLwHQvVJ@dpg-cl7lsliuuipc73eij48g-a/usermessages_k0v6")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	app := &application{}
	app.db = db

	fmt.Println("Succesfully Connected to Database")

	http.HandleFunc("/index", app.index)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./"))))
	http.ListenAndServe(":8000", nil)
}
