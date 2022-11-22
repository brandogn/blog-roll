#!/bin/bash

# Store Templates in vars

ROOT="$(pwd)"
HOME_DIR="${ROOT}/templates/template_folder/template_home.pug"
PAGE_DIR="${ROOT}/templates/template_folder/template_page.pug"

# Create file structure

echo "Creating structure in ${ROOT}"
mkdir pages/; cd pages/

for i in "I" "II" "III"
do
    mkdir "Proj_${i}"
    cp $HOME_DIR "Proj_${i}/p_${i}_home.pug"
    cp $PAGE_DIR "Proj_${i}/p_${i}_page.pug"
done


# pug render

cd ..
echo "pug output:"
pug ./ -o ./docs -P


# Option to remove /pages dir, mainly for debugging

echo "Remove Directory? [y/n]"
read rm_input

if [ rm_input == "y" ]
then
    rm -rf pages
fi
