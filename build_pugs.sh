#!/bin/bash

# Store Templates in vars



ROOT="$(pwd)"
PUG="${ROOT}/pug"
HOME_TEMPLATE="${ROOT}/template_home.pug"
PAGE_TEMPLATE="${ROOT}/template_page.pug"

# Create file structure

echo "Creating structure in ${ROOT}, making "
mkdir $PUG
cp index.pug "${PUG}/index.pug"
sed -i "s/utils/..\/utils ${PUG}/index.pug"
cd $PUG

for i in "I" "II" "III"
do
    PROJ_DIR="Proj_${i}"
    mkdir $PROJ_DIR
    cp $HOME_TEMPLATE "${PROJ_DIR}/p_${i}_home.pug"
    sed -i "s/utils/..\/..\/utilsl ${PUG}/index.pug"
    cp $PAGE_TEMPLATE "${PROJ_DIR}/p_${i}_page.pug"
    sed -i "s/utils/..\/..\/utilsl ${PUG}/index.pug"
done


# pug render

cd ..
echo "pug output:"
pug $PUG -o ./docs -P


# # Option to remove /pages dir, mainly for debugging

# echo "Remove Directory: ${PUG} ? [y/n]" && read rm_input

# if [ rm_input == "y" ]
# then
#     rm -rf $PUG
#     echo ". . . removed directory"
# fi
