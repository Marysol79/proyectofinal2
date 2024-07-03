from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configuración de la conexión a MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'consultas'

# Inicialización de la extensión MySQL
mysql = MySQL(app)

# Configuración adicional de la aplicación Flask
app.secret_key = 'mysecretkey'
app.static_folder = 'static'

# Rutas

# Página de inicio
@app.route('/')
def Index():
    return render_template('index.html')

# Página de destinos
@app.route('/destinos')
def destinos():
    return render_template('destinos.html')

# Página de galería de fotos
@app.route('/galeria')
def galeria():
    return render_template('galeria1.html')

# Página de inicio de sesión
@app.route('/inisesion')
def inisesion():
    return render_template('inicioSesion.html')

# Página de quienes somos
@app.route('/quienessomos')
def quienessomos():
    return render_template('quienesSomos.html')

# Página de tipos de viajes
@app.route('/tiposdeviajes')
def tiposdeviajes():
    return render_template('tiposdeviajes.html')

# Página de vuelos
@app.route('/vuelos')
def vuelos():
    return render_template('vuelos.html')

# Página de envío exitoso
@app.route('/envioExitoso')
def envio_exitoso():
    return render_template('envioExitoso.html')

# Página del formulario de consultas
@app.route('/formularioConsultas')
def formularioConsultas():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM consultas')
    data = cur.fetchall()
    cur.close()
    return render_template('formularioConsultas.html', consultas=data)

# Procesar formulario de consultas
@app.route('/consultas', methods=['POST'])
def add_consultas():
    if request.method == 'POST':
        firstname = request.form['nombre']
        lastname = request.form['apellido']
        email = request.form['email']
        cellphone = request.form['phone']
        travelDate = request.form['travelDate']
        passengers = request.form['passengers']
        message = request.form['message']
        recomendacion = request.form['howDidYouFindUs']

        # Validación y ajuste del campo travelDate
        if travelDate == '':
            travelDate = None  # Asignar None si travelDate está vacío
        # Validación y ajuste del campo passengers (pax)
        if passengers == '':
            passengers = None  # Asignar None si passengers está vacío    

        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO consultas (nombre, apellido, email, phone, date, pax, consulta, recomendacion) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                    (firstname, lastname, email, cellphone, travelDate, passengers, message, recomendacion))

        mysql.connection.commit()
        cur.close()

        flash('Consulta agregada satisfactoriamente')
        return redirect(url_for("envio_exitoso"))

# Página de la lista de consultas
@app.route('/list_consultas')
def list_consultas():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM consultas')
    data = cur.fetchall()
    cur.close()
    return render_template('list_consultas.html', consultas=data)

# Página de editar consulta
@app.route('/edit/<int:id>')
def get_consulta(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM consultas WHERE id = %s', (id,))
    data = cur.fetchall()
    cur.close()
    return render_template('edit_consultas.html', consulta=data[0])

# Actualizar consulta
@app.route('/update/<id>', methods=['POST'])
def update_consulta(id):
    if request.method == 'POST':
        firstname = request.form['nombre']
        lastname = request.form['apellido']
        email = request.form['email']
        cellphone = request.form['phone']
        travelDate = request.form['travelDate']
        passengers = request.form['passengers']
        message = request.form['message']
        recomendacion = request.form['howDidYouFindUs']

        # Validación y ajuste del campo travelDate
        if travelDate == '':
            travelDate = None  # Asignar None si travelDate está vacío

        # Validación y ajuste del campo passengers (pax)
        if passengers == '':
            passengers = None  # Asignar None si passengers está vacío

        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE consultas
            SET nombre = %s,
                apellido = %s,
                email = %s,
                phone = %s,
                date = %s,
                pax = %s,
                consulta = %s,
                recomendacion = %s
            WHERE id = %s
        """, (firstname, lastname, email, cellphone, travelDate, passengers, message, recomendacion, id))
        
        mysql.connection.commit()
        cur.close()

        flash('Consulta actualizada satisfactoriamente')
        return redirect(url_for('list_consultas'))

    flash('Error al actualizar la consulta')
    return redirect(url_for('list_consultas'))

# Eliminar consulta
@app.route('/delete/<int:id>')
def delete_consulta(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM consultas WHERE id = %s', (id,))
    mysql.connection.commit()
    cur.close()

    flash("Consulta eliminada satisfatoriamente")
    return redirect(url_for('list_consultas'))

if __name__ == '__main__':
    app.run(port=3000, debug=True)
