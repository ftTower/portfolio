VENV ?= venv
PY := $(VENV)/bin/python

.PHONY: run clean venv

venv: $(PY)

$(PY):
	python3 -m venv $(VENV)

run: venv
	$(PY) -m http.server 
	
clean:
	rm -rf $(VENV)