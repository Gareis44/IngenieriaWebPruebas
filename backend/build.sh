# exit on error
set -o errexit

# install project dependencies
uv sync
pip install -r requirements.txt

# make sure django has all the things it needs to run
cd $(dirname $(find . | grep manage.py$))
uv run ./manage.py collectstatic --no-input
uv run ./manage.py migrate
python manage.py createsuperuser --username admin --email "kevin14hubeli@gmail.com" --noinput || true