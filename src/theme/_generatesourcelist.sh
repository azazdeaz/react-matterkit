#use for regenerate the sourceList.js
#cd src/theme && bash _generatesourcelist.sh && cd ../..
target="sourceList.js"
files="sources/*"
regex="(\w+)\.js"
> $target
for f in $files
do
    [[ $f =~ $regex ]]
    name="${BASH_REMATCH[1]}"
    echo "export { default as ${name} } from './${f}'" >> $target
done
echo "done"
