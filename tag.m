function result = tag(m)
    result = zeros(size(m,1),1);
    for i=1:size(m,1)
        max=m(i,1);
        maxj=1;
        for j=2:size(m,2)
            if m(i,j)>max
                max=m(i,j);
                maxj=j;
            end
        end
        result(i)=maxj;
    end
end