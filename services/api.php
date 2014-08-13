<?php
 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		// Variables
		public $data = "";

		const DB_SERVER = "localhost";
		const DB_USER = "root";
		const DB_PASSWORD = "";
		const DB = "classicmodels";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();
			$this->dbConnect();	
		}
		
		// Initialization
		public function init(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404);
		}

		// Utility Functions
		private function jsonify($data){ if(is_array($data)) return json_encode($data); }

		// Database Functions
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}

		private function getClients(){	
			if($this->get_request_method() != "GET") $this->response('',406);
			$query =
				"SELECT c.*, e.employeeNumber, e.lastName AS 'em_lastName', e.firstName AS 'em_firstName', e.email AS 'em_email',
					o.city AS 'o_city',
					ps.*,
					os.*
				FROM customers c
				LEFT JOIN employees e ON e.employeeNumber = c.salesRepEmployeeNumber
				LEFT JOIN offices o ON o.officeCode = e.officeCode
				LEFT JOIN
					(SELECT p.customerNumber AS p_customerNumber,
						GROUP_CONCAT(p.checkNumber) AS p_checks,
						GROUP_CONCAT(CONVERT(p.paymentDate, CHAR(16))) AS p_dates,
						GROUP_CONCAT(CONVERT(p.amount, CHAR(16))) AS p_amounts
						FROM payments p GROUP BY p.customerNumber) ps
					ON ps.p_customerNumber = c.customerNumber
				LEFT JOIN
					(SELECT o.customerNumber AS o_customerNumber,
						GROUP_CONCAT(CONVERT(o.orderNumber, CHAR(16))) AS o_orders,
						GROUP_CONCAT(CONVERT(o.orderDate, CHAR(16))) AS o_orderDates,
						GROUP_CONCAT(CONVERT(o.requiredDate, CHAR(16))) AS o_requiredDates,
						GROUP_CONCAT(CONVERT(o.shippedDate, CHAR(16))) AS o_shippedDates,
						GROUP_CONCAT(o.status) AS o_statuses,
						GROUP_CONCAT(o.comments) AS o_comments
						FROM orders o GROUP BY o.customerNumber) os
					ON os.o_customerNumber = c.customerNumber";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->jsonify($result), 200);
			}
			$this->response('',204);
		}
	}

	$api = new API;
	$api->init();

?>