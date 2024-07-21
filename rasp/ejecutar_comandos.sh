#!/bin/bash

cd project
python3 lectura.py "$1" "$2"
python3 ex.py "$1" "$2"

