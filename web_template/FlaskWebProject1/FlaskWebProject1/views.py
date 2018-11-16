"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template, request, send_from_directory
from FlaskWebProject1 import app
import os

ourCode = ["3cR8vf1GDUAPvbBqHW7pmTBjZ2mCqX4Gic4QNiK7N6mj"]

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'input.html'
    )

@app.route('/result', methods = ['POST'])
def resultnm():
    #result = request.form.to_dict()
    if request.method == 'POST':
        userinput = request.form.to_dict()['doc-code']
        if userinput not in ourCode:
            return render_template(
                'result_not_matched.html',
                result = userinput
            )
        else:
            return render_template(
                'result.html',
                result = userinput
            )

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='static/lib/my/logoBMCord.png')