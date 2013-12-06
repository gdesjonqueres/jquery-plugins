<?php
$values = array(
array('id' => 'ABARTH', 'label' => 'ABARTH'),
array('id' => 'A.B.C.', 'label' => 'ABC'),
array('id' => 'AC', 'label' => 'AC'),
array('id' => 'ACCESS', 'label' => 'ACCESS'),
array('id' => 'ACL', 'label' => 'ACL'),
array('id' => 'A.C.M', 'label' => 'ACM'),
array('id' => 'ACM', 'label' => 'ACM'),
array('id' => 'A.C.M.A.', 'label' => 'ACMA'),
array('id' => 'ACMA', 'label' => 'ACMA'),
array('id' => 'ACMAT', 'label' => 'ACMAT'),
array('id' => 'ACREA', 'label' => 'ACREA'),
array('id' => 'ACURA', 'label' => 'ACURA'),
array('id' => 'ADIVA', 'label' => 'ADIVA'),
array('id' => 'ADLER', 'label' => 'ADLER'),
array('id' => 'ADLY', 'label' => 'ADLY'),
array('id' => 'AEBI', 'label' => 'AEBI'),
array('id' => 'AEC', 'label' => 'AEC'),
array('id' => 'AEON', 'label' => 'AEON'),
array('id' => 'AERMACCHI', 'label' => 'AERMACCHI'),
array('id' => 'AGF', 'label' => 'AGF'),
array('id' => 'AGM', 'label' => 'AGM'),
array('id' => 'AGRATI', 'label' => 'AGRATI'),
array('id' => 'AGRIP', 'label' => 'AGRIP'),
array('id' => 'AIE', 'label' => 'AIE'),
array('id' => 'AIGLON', 'label' => 'AIGLON'),
array('id' => 'AIRSTREAM', 'label' => 'AIRSTREAM'),
array('id' => 'AIXAM', 'label' => 'AIXAM'),
array('id' => 'AIYUMO', 'label' => 'AIYUMO'),
array('id' => 'AJP', 'label' => 'AJP'),
array('id' => 'AJS', 'label' => 'AJS'),
array('id' => 'ALCYON', 'label' => 'ALCYON'),
array('id' => 'ALFA ROMEO', 'label' => 'ALFAROMEO'),
array('id' => 'ALKE', 'label' => 'ALKE'),
array('id' => 'ALLARD', 'label' => 'ALLARD'),
array('id' => 'A.L.M.', 'label' => 'ALM.'),
array('id' => 'ALMA', 'label' => 'ALMA'),
array('id' => 'ALP SAITIN', 'label' => 'ALPSAITIN'),
array('id' => 'ALPHA', 'label' => 'ALPHA'),
array('id' => 'ALQUIER', 'label' => 'ALQUIER'),
array('id' => 'ALVIS', 'label' => 'ALVIS'),
array('id' => 'AMAZONE', 'label' => 'AMAZONE'),
array('id' => 'A.M.C.', 'label' => 'A.M.C.'),
array('id' => 'AMERICAN', 'label' => 'AMERICAN'),
array('id' => 'A.M.F.', 'label' => 'AMF.'),
array('id' => 'A.M.G.', 'label' => 'AMG.'),
array('id' => 'AMILCAR', 'label' => 'AMILCAR'),
array('id' => 'AMS', 'label' => 'AMS'),
array('id' => 'ANATOLIA', 'label' => 'ANATOLIA'),
array('id' => 'APAL', 'label' => 'APAL'),
array('id' => 'APOLLO', 'label' => 'APOLLO'),
array('id' => 'APRILIA', 'label' => 'APRILIA'),
array('id' => 'APRO', 'label' => 'APRO'),
array('id' => 'APTS', 'label' => 'APTS'),
array('id' => 'AQUILA', 'label' => 'AQUILA'),
array('id' => 'ARCTIC CAT', 'label' => 'ARCTICCAT'),
array('id' => 'ARCUEILMOT', 'label' => 'ARCUEILMOT'),
);

$results = array();
$lookup = !empty($_REQUEST['lookup'])
  && preg_match("#^[\w\.-\s0-9]+$#", $_REQUEST['lookup']) ? strtolower($_REQUEST['lookup']) : '';

//$lookup = 'ap';
if (!empty($lookup)) {
  $GLOBALS['lookup'] = $lookup;
  $results = array_filter($values, function($v) {
    if (strstr(strtolower($v['label']), $GLOBALS['lookup'])) {
      return true;
    }
    return false;
  });
}

echo json_encode(array_values($results));